import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipe-form-edit',
  templateUrl: 'recipe-form-edit.html',
})
export class RecipeFormEditPage implements OnInit {
  updIngr;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) { 
  }

  ngOnInit() {
    this.updIngr = this.navParams.get('ingredient');
  }

  updateIngredient() {
    let updated = this.updIngr;
    this.viewCtrl.dismiss(updated);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
