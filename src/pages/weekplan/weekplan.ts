import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-weekplan',
  templateUrl: 'weekplan.html',
})
export class WeekplanPage {
  public plan = [];
  editing = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localStorage: LocalStorageProvider) {
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

  fillUpPlan() {
    const today = new Date(Date.now())
    for (var i = 0; i < 7; i++) {
      if (!this.datePresent(this.addDays(today, i))) {
        this.plan.push({recipe: null, date: this.addDays(today, i)});
      }
    }
    this.plan.sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
  }
  
  exitEditMode() {
    this.editing = false;
  }

  editMode() {
    this.editing = true;
  }

  addEntry(title, dayIndex) {
    if (title !== '') {
      const today = new Date(Date.now());
      this.plan[this.getByDate(this.addDays(today, dayIndex))].recipe = {title: title};
      this.localStorage.addRecipe(null, this.addDays(today, dayIndex), title);
    }
  }

  deleteEntry(dayIndex) {
    const date = this.addDays(new Date(Date.now()), dayIndex);
    this.plan[this.getByDate(date)].recipe = null;
    this.plan[this.getByDate(date)].custom = '';
    this.localStorage.removeRecipe(date);
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
  
  private getById(id: string):number {
    return this.plan.findIndex((day) => {
      return day.recipe._id === id;
    })
  }
  
  private getByDate(date: Date):number {
    return this.plan.findIndex((day) => {
     return new Date(day.date).getDate() === new Date(date).getDate();
    });
  }

}
