import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-weekplan-new-entry',
  templateUrl: 'weekplan-new-entry.html',
})
export class WeekplanNewEntryPage {
  day = "0";
  time = "19:30";
  servings: number;
  recipes = new Array();

  constructor(
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public localStorage: LocalStorageProvider,
    public settings: SettingsProvider
  ) {
    this.settings.getDefaultTime().then((time) => {
      if (time) {
        this.time = time;
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
    if (this.navParams.get('day')) {
      this.day = this.navParams.get('day');
    }
  }

  save(title) {
    let data = {
      title: title,
      day: +this.day,
      recipe: null,
      time: this.time,
      servings: this.servings
    }
    this.viewCtrl.dismiss(data);
  }

  saveRecipe(recipe) {
    let data = {
      title: '',
      day: +this.day,
      recipe: {
        id: recipe._id,
        title: recipe.title,
      },
      time: this.time,
      servings: this.servings
    }
    this.viewCtrl.dismiss(data);
  }

  servingsChange(servings: number) {
    this.servings = servings;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  getDate(index) {
    const today = new Date(Date.now());
    return this.addDays(today, index);
  }

  private addDays(date: Date, days: number): Date {
    const newDate = new Date();
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
}
