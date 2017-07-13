import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-shopping-list-edit',
  templateUrl: 'shopping-list-edit.html',
})
export class ShoppingListEditPage implements OnInit {
  item: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) { }

  ngOnInit() {
    this.item = this.navParams.get('item');
  }

  update() {
    this.viewCtrl.dismiss(this.item);
  }

}
