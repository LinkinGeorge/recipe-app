import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { PlanEntry } from '../../models/plan-entry';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-weekplan',
  templateUrl: 'weekplan.html',
})
export class WeekplanPage {
  public plan = new Array<PlanEntry>();
  deleting = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public localStorage: LocalStorageProvider
  ) {
    this.localStorage.getPlan().then((plan) => {
      if (plan) {
        this.plan = JSON.parse(plan);
        this.fillUpPlan();
      }
    });
  }

  ionViewDidEnter() {
    this.localStorage.getPlan().then((plan) => {
      if (plan) {
        this.plan = JSON.parse(plan);
      }
      this.fillUpPlan();
    });
  }

  newEntry() {
    let newEntryModal = this.modalCtrl.create('WeekplanNewEntryPage');
    newEntryModal.onDidDismiss(data => {
      if (data) {
        this.addEntry(data.title, data.day);
      }
    })
    newEntryModal.present();
  }

  addEntry(title, dayIndex) {
    if (title !== '') {
      const today = new Date(Date.now());
      this.plan[this.getByDate(this.addDays(today, dayIndex))].recipe = null;
      this.plan[this.getByDate(this.addDays(today, dayIndex))].custom = title;
      const newEntry = new PlanEntry(null, this.addDays(today, dayIndex), title);
      this.localStorage.addEntry(newEntry);
    }
  }

  deleteEntry(dayIndex) {
    const date = this.addDays(new Date(Date.now()), dayIndex);
    this.plan[this.getByDate(date)].recipe = null;
    this.plan[this.getByDate(date)].custom = '';
    this.localStorage.removeEntry(date);
  }

  hasRecipe(entry) {
    if (entry.recipe !== null || entry.custom !== '') {
      return true;
    } else {
      return false;
    }
  }

  viewRecipe(recipe = null) {
    if (recipe !== null) {
      this.navCtrl.push('RecipeDetailsPage', {
        recipeId: recipe._id
      });
    }
  }

  exitDeleteMode() {
    this.deleting = false;
  }

  deleteMode() {
    this.deleting = true;
  }

  private fillUpPlan() {
    const today = new Date(Date.now())
    for (var i = 0; i < 7; i++) {
      if (!this.datePresent(this.addDays(today, i))) {
        this.plan.push({recipe: null, date: this.addDays(today, i), custom: ''});
      }
    }
    this.plan.sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
  }

  private addDays(date: Date, days: number): Date {
    const newDate = new Date();
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  private datePresent(date: Date):boolean {
    return this.plan.findIndex((day) => {
      return new Date(day.date).getDay() === new Date(date).getDay();
    }) !== -1;
  }
  
  private getByDate(date: Date):number {
    return this.plan.findIndex((day) => {
     return new Date(day.date).getDate() === new Date(date).getDate();
    });
  }

}
