import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { ShoppingListMenuPage } from '../shopping-list-menu/shopping-list-menu';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  public shoppingList = [];
  addingItem = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public popoverCtrl: PopoverController,
    public shoppingListServcice: ShoppingListProvider
  ) {
    this.shoppingListServcice.getList().then((list) => {
      if(list) {
        this.shoppingList = JSON.parse(list);
      }
    })
  }

  ionViewDidEnter() {
    this.shoppingListServcice.getList().then((list) => {
      if(list) {
        this.shoppingList = JSON.parse(list);
      }
    })
  }

  showMenu(event) {
    let popover = this.popoverCtrl.create(ShoppingListMenuPage);
    popover.present({
      ev: event
    });
  }

  addItem(item) {
    if (item !== '') {
      this.shoppingList.push(item);
      this.shoppingListServcice.addItem(item);
    }
  }

  removeItem(item) {
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    this.shoppingListServcice.removeItem(item);
  }

}