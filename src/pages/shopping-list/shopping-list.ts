import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

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
    public localStorage: LocalStorageProvider
  ) {
    this.localStorage.downloadList().then(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.resetOldList();
          this.shoppingList = JSON.parse(list);
        }
      });
    }).catch(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.setOldList(JSON.parse(list));
          this.shoppingList = JSON.parse(list);
        }
      });
    });
  }

  ionViewDidEnter() {
    this.localStorage.downloadList().then(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.resetOldList();
          this.shoppingList = JSON.parse(list);
        }
      });
    }).catch(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.setOldList(JSON.parse(list));
          this.shoppingList = JSON.parse(list);
        }
      });
    });
  }
  
  doRefresh(refresher) {
    this.localStorage.downloadList().then(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.resetOldList();
          this.shoppingList = JSON.parse(list);
        }
        refresher.complete();
      });
    }).catch(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.setOldList(JSON.parse(list));
          this.shoppingList = JSON.parse(list);
        }
        refresher.complete();
      });
    });
  }

  addItem(item) {
    if (item !== '') {
      this.shoppingList.push(item);
      this.localStorage.addItem(item);
    }
  }

  removeItem(item) {
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    this.localStorage.removeItem(item);
  }

}