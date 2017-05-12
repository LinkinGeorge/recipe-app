import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ShoppingListProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShoppingListProvider {
  public list = [];

  constructor(public storage: Storage) {

  }

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

}
