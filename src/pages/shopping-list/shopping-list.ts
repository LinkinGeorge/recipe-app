import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  public shoppingList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public shoppingListServcice: ShoppingListProvider) {
    this.shoppingListServcice.getList().then((list) => {
      if(list) {
        this.shoppingList = JSON.parse(list);
        console.log(JSON.parse(list));
      }
    })
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.shoppingListServcice.getList().then((list) => {
      if(list) {
        this.shoppingList = JSON.parse(list);
        console.log(JSON.parse(list));
      }
    })
  }

  removeItem(item) {
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    this.shoppingListServcice.removeItem(item);
  }

}
