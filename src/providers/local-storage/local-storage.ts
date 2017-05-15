import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalStorageProvider {
  public plan = [];
  public list = [];

  constructor(public storage: Storage) { }

  // SHOPPING LIST

  getList() {
    return this.storage.get('list');
  }

  addItem(item: string) {
    this.list.push(item);
    this.storage.set('list', JSON.stringify(this.list));
  }

  removeItem(item: string) {
    this.list.splice(this.list.indexOf(item), 1);
    this.storage.set('list', JSON.stringify(this.list));
  }

  // WEEKPLAN

  getPlan() {
    this.plan.forEach(recipe => {
      if (recipe.date.getTime() < Date.now()) {
        this.plan.splice(this.plan.indexOf(recipe), 1);
      }
    });
    this.storage.set('plan', JSON.stringify(this.plan));
    return this.storage.get('plan');
  }

  addRecipe(recipe, date) {
    if (this.datePresent(date)) {
      this.plan[this.getByDate(date)].recipe = recipe;
    } else {
      this.plan.push({recipe: recipe, date: date});
    }
    this.storage.set('plan', JSON.stringify(this.plan));
  }

  updateRecipe(recipe) {
    this.plan[this.getById(recipe._id)].recipe = recipe;
    this.storage.set('plan', JSON.stringify(this.plan));
  }

  removeRecipe(id: string) {
    this.plan.splice(this.getById(id), 1);
    this.storage.set('plan', JSON.stringify(this.plan));
  }

  private getById(id: string):number {
    return this.plan.findIndex((day) => {
      return day.recipe._id === id;
    })
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
