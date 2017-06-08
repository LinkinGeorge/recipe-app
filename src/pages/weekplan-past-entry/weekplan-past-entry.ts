import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-weekplan-past-entry',
  templateUrl: 'weekplan-past-entry.html',
})
export class WeekplanPastEntryPage {
  recipes = new Array();
  weekplan = [];
  date = new Date(Date.now()).toISOString();
  servings: number;
  time: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public localStorage: LocalStorageProvider,
    public settings: SettingsProvider
  ) {
    this.settings.getDefaultTime().then((time) => {
      if (time) {
        this.time = time;
      } else {
        this.time = '19:30';
      }
    });
    this.settings.getDefaultServings().then((serv) => {
      if (serv) {
        this.servings = serv;
      } else {
        this.servings = 2;
      }
    });
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
      date: this.date,
      time: this.time,
      servings: this.servings
    }
    this.viewCtrl.dismiss(data);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
  servingsChange(servings: number) {
    this.servings = servings;
  }

}
