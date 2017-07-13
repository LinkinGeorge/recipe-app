import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';

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
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public localStorage: LocalStorageProvider
  ) {
    this.refresh();
  }

  ionViewDidEnter() {
    this.refresh();
  }
  
  doRefresh(refresher) {
    this.refresh(refresher);
  }

  addItem(item) {
    if (item !== '') {
      this.shoppingList.push(item);
      this.localStorage.addItem(item);
    }
  }

  editItem(item) {
    let editModal = this.modalCtrl.create('ShoppingListEditPage', {item: item});
    editModal.onDidDismiss(updated => {
      this.shoppingList.splice(this.shoppingList.indexOf(item), 1, updated);
      this.localStorage.updateItem(item, updated);
    });
    editModal.present();
  }

  removeItem(item) {
    this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
    this.localStorage.removeItem(item);
  }

  private refresh(refresher?) {
    this.localStorage.downloadList().then(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.resetOldList();
          this.shoppingList = JSON.parse(list);
        }
        if (refresher) {
          refresher.complete();
        }
      });
    }).catch(() => {
      this.localStorage.getList().then((list) => {
        if (list) {
          this.localStorage.setOldList(JSON.parse(list));
          this.shoppingList = JSON.parse(list);
        }
        if (refresher) {
          refresher.complete();
        }
      });
    });
  }

}