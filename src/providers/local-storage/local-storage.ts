import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {
  public plan = [];
  public list = [];

  constructor(public storage: Storage) {
    this.removeExpired();
  }

  // SHOPPING LIST

  getList() {
    return this.storage.get('list');
  }

  addItem(item: string) {
    this.getList().then((list) => {
      this.list = JSON.parse(list);
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

  addRecipe(recipe, date, custom) {
    this.getPlan().then((plan => {
      this.plan = JSON.parse(plan);
      if (this.datePresent(date)) {
        this.plan[this.getByDate(date)].recipe = recipe;
        this.plan[this.getByDate(date)].custom = custom;
      } else {
        this.plan.push({recipe: recipe, date: date, custom: custom});
      }
      this.storage.set('plan', JSON.stringify(this.plan));
    }));
  }

  removeRecipe(date: Date) {
    this.getPlan().then((plan => {
      this.plan = JSON.parse(plan);
      this.plan.splice(this.getByDate(date), 1);
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

  private getByDate(date: Date):number {
    return this.plan.findIndex((day) => {
     return new Date(day.date).getDate() === new Date(date).getDate();
    });
  }

  private datePresent(date: Date):boolean {
    return this.plan.findIndex((day) => {
      return new Date(day.date).getDate() === new Date(date).getDate();
    }) !== -1;
  }

}
