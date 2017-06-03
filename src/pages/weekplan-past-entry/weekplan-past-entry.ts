import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-weekplan-past-entry',
  templateUrl: 'weekplan-past-entry.html',
})
export class WeekplanPastEntryPage {
  recipes = new Array();
  weekplan = [];
  date = new Date(Date.now()).toISOString();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public localStorage: LocalStorageProvider
  ) {
    this.localStorage.getRecipes().then((recipes) => {
      this.recipes = JSON.parse(recipes);
    });
  }

  save(recipe) {
    let data = {
      recipe: {
        id: recipe._id,
        title: recipe.title,
      },
      date: this.date
    }
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
