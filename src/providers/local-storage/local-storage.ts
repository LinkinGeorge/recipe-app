import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { PlanEntry } from '../../models/plan-entry';

@Injectable()
export class LocalStorageProvider {
  public recipes = new Array();
  public plan = new Array<PlanEntry>();
  public list = new Array<string>();

  constructor(public storage: Storage) {
    this.removeExpired();
  }

  // RECIPES

  getRecipes() {
    return this.storage.get('recipes');
  }

  getRecipe(recipeId: string) {
    return new Promise(
      resolve => {
        this.getRecipes().then((recipes) => {
          if (recipes) {
            let recipeArray = JSON.parse(recipes);
            const index = this.getById(recipeArray, recipeId);
            if (index !== -1) {
              let stored = recipeArray[index];
              resolve(stored);
            } else {
              console.log('Recipe not found');
            }
          }
        }
      )
    });
  }

  setRecipes(recipes) {
    this.storage.set('recipes', JSON.stringify(recipes));
  }

  addRecipe(recipe) {
    return new Promise(
      resolve => {
        this.getRecipes().then((recipes) => {
          if (recipes) {
            this.recipes = JSON.parse(recipes);
          }
          this.recipes.push(recipe);
          this.storage.set('recipes', JSON.stringify(this.recipes)).then(() => {
            resolve(recipe);
          });
        })
      }
    );
  }

  updateRecipe(recipe) {
    return new Promise(
      resolve => {
        this.getRecipes().then((recipes) => {
          let recipeArray = JSON.parse(recipes);
          const index = this.getById(recipeArray, recipe._id);
          if (index !== -1) {
            recipeArray.splice(index, 1, recipe);
          }
          this.storage.set('recipes', JSON.stringify(recipeArray)).then(() => {
            resolve(recipe)
          });
        })
      }
    )
  }

  private getById(recipes: any[], recipeId: string):number {
    return recipes.findIndex((rec) => {
     return rec._id === recipeId;
    });
  }

  // SHOPPING LIST

  getList() {
    return this.storage.get('list');
  }

  addItem(item: string) {
    this.getList().then((list) => {
      if (list) {
        this.list = JSON.parse(list);
      }
      this.list.push(item);
      this.storage.set('list', JSON.stringify(this.list));
    });
  }

  removeItem(item: string) {
    this.getList().then((list) => {
      this.list = JSON.parse(list);
      this.list.splice(this.list.indexOf(item), 1);
      this.storage.set('list', JSON.stringify(this.list));
    });
  }

  // WEEKPLAN

  getPlan() {
    return this.storage.get('plan');
  }

  addEntry(entry: PlanEntry) {
    return new Promise(
      resolve => {
        this.getPlan().then((plan => {
          this.plan = JSON.parse(plan);
          this.plan.push(entry);
          this.storage.set('plan', JSON.stringify(this.plan)).then(() => {
            resolve();
          });
        }));
      }
    );
  }

  removeEntry(id: string) {
    this.getPlan().then((plan => {
      this.plan = JSON.parse(plan);
      let delIndex = this.findEntryById(id);
      if (delIndex !== -1) {
        this.plan.splice(delIndex, 1);
      }
      this.storage.set('plan', JSON.stringify(this.plan));
    }));
  }

  private removeExpired() {
    this.storage.get('plan').then((plan) => {
      if (plan) {
        this.plan = JSON.parse(plan);
        this.plan.forEach(recipe => {
          const recipeDate = new Date(new Date(recipe.date).setHours(0,0,0,0));
          const today = new Date(new Date(Date.now()).setHours(0,0,0,0));
          if (recipeDate.getTime() < today.getTime()) {
            this.plan.splice(this.plan.indexOf(recipe), 1);
          }
        });
      }
      this.storage.set('plan', JSON.stringify(this.plan));
    });
  }

  private findEntryById(id: string):number {
    return this.plan.findIndex((entry) => {
      return entry._id === id;
    });
  }

}
