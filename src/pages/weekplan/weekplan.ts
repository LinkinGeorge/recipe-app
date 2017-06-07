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
  week = new Array<Date>(7);
  weekString = 'Diese Woche';
  weekDifference = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public localStorage: LocalStorageProvider
  ) {
    for (var i = 0; i < this.week.length; i++) {
      this.week[i] = this.addDays(new Date(Date.now()), i);
    }
    this.localStorage.downloadPlan().then(() => {
      this.localStorage.getPlan().then((plan) => {
        if (plan) {
          this.plan = JSON.parse(plan);
        }
        this.fillUpPlan();
      });
    });
  }

  ionViewDidEnter() {
    this.localStorage.downloadPlan().then(() => {
      this.localStorage.getPlan().then((plan) => {
        if (plan) {
          this.plan = JSON.parse(plan);
        }
        this.fillUpPlan();
      });
    });
  }
    
  doRefresh(refresher) {
    this.localStorage.downloadPlan().then(() => {
      this.localStorage.getPlan().then((plan) => {
        if(plan) {
          this.plan = JSON.parse(plan);
        }
        refresher.complete();
      });
    });
  }

  newEntry() {
    let newEntryModal = this.modalCtrl.create('WeekplanNewEntryPage');
    newEntryModal.onDidDismiss(data => {
      if (data) {
        let recipe;
        if (data.recipe) {
          recipe = {id: data.recipe.id, title: data.recipe.title};
        } else {
          recipe = null;
        }
        this.addEntry(data.title, data.day, recipe, data.time, data.servings);
      }
    });
    newEntryModal.present();
  }

  newDayEntry(dayIndex) {
    if (!this.deleting) {
      let newEntryModal = this.modalCtrl.create('WeekplanNewEntryPage', {day: dayIndex.toString()});
      newEntryModal.onDidDismiss(data => {
        if (data) {
          let recipe;
          if (data.recipe) {
            recipe = {id: data.recipe.id, title: data.recipe.title};
          } else {
            recipe = null;
          }
          this.addEntry(data.title, data.day, recipe, data.time, data.servings);
        }
      });
      newEntryModal.present();
    }
  }

  addEntry(title, dayIndex, recipe, time, servings) {
    const id = this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    if (title !== '') {
      const today = new Date(Date.now());
      const newEntry = new PlanEntry(null, this.addDays(today, dayIndex), title, time, servings, id);
      this.localStorage.addEntry(newEntry).then(() => {
        this.localStorage.getPlan().then((plan) => {
          if (plan) {
            this.plan = JSON.parse(plan);
          }
          this.fillUpPlan();
        });
      });
    } 
    if (recipe !== null) {
      const today = new Date(Date.now());
      const newEntry = new PlanEntry({id: recipe.id, title: recipe.title}, this.addDays(today, dayIndex), '', time, servings, id);
      this.localStorage.addEntry(newEntry).then(() => {
        this.localStorage.getPlan().then((plan) => {
          if (plan) {
            this.plan = JSON.parse(plan);
          }
          this.fillUpPlan();
        });
      });;
    }
  }

  pastEntry() {
    const id = this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let pastEntryModal = this.modalCtrl.create('WeekplanPastEntryPage');
    pastEntryModal.onDidDismiss(data => {
      if (data) {
        const recipe = {id: data.recipe.id, title: data.recipe.title};
        const pastEntry = new PlanEntry(recipe, new Date(data.date), '', '19:30', 2, id);
        this.localStorage.addEntry(pastEntry).then(() => {
          this.localStorage.getPlan().then((plan) => {
            if (plan) {
              this.plan = JSON.parse(plan);
            }
            this.fillUpPlan();
          });
        });
      }
    });
    pastEntryModal.present();
  }

  editEntry(entry) {
    let editEntryModal = this.modalCtrl.create('WeekplanEditEntryPage', {entry: entry});
    editEntryModal.onDidDismiss(data => {
      if (data) {
        this.localStorage.updateEntry(data._id, data.time, data.servings);
      }
    });
    editEntryModal.present();
  }

  deleteEntry(entry) {
    this.plan[this.plan.indexOf(entry)].recipe = null;
    this.plan[this.plan.indexOf(entry)].custom = '';
    return this.localStorage.removeEntry(entry._id);
  }

  hasRecipe(entry) {
    if (entry.recipe !== null || entry.custom !== '') {
      return true;
    } else {
      return false;
    }
  }

  viewRecipe(recipe = null, servings:number) {
    if (recipe !== null && !this.deleting) {
      this.navCtrl.push('RecipeDetailsPage', {
        recipeId: recipe.id,
        servings: servings
      });
    }
  }

  exitDeleteMode() {
    this.deleting = false;
  }

  deleteMode() {
    this.deleting = true;
  }

  weekBack() {
    this.weekDifference--;
    this.weekString = this.getWeekString(this.weekDifference);
    this.weekDifference === 0 ? this.weekString = 'Diese Woche' : this.weekString = 'Woche (' + this.weekDifference + ')';
    let oldStart = new Date(this.week[0]);
    let newStart = new Date(this.subtractDays(oldStart, 7));
    for (var i = 0; i < this.week.length; i++) {
      this.week[i] = this.addDays(new Date(newStart), i);
    }
  }

  weekForward() {
    this.weekDifference++;
    this.weekString = this.getWeekString(this.weekDifference);
    let oldStart = new Date(this.week[0]);
    let newStart = new Date(this.addDays(oldStart, 7));
    for (var i = 0; i < this.week.length; i++) {
      this.week[i] = this.addDays(new Date(newStart), i);
    }
  }

  resetWeek() {
    this.weekDifference = 0;
    this.weekString = this.getWeekString(this.weekDifference);
    for (var i = 0; i < this.week.length; i++) {
      this.week[i] = this.addDays(new Date(Date.now()), i);
    }
  }

  private fillUpPlan() {
    const today = new Date(Date.now())
    for (var i = 0; i < 7; i++) {
      if (!this.datePresent(this.addDays(today, i))) {
        this.plan.push({recipe: null, date: this.addDays(today, i), custom: '', time: '19:30', servings: 2});
      }
    }
    this.plan.sort(function (a, b) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
  }

  private addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  private subtractDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
  }

  private datePresent(date: Date):boolean {
    return this.plan.findIndex((day) => {
      return new Date(day.date).getDay() === new Date(date).getDay();
    }) !== -1;
  }

  private getWeekString(difference: number):string {
    if (difference === 0) {
      return 'Diese Woche'
    } else if (difference > 0) {
      return 'Woche (+' + difference + ')';
    } else {
      return 'Woche (' + difference + ')';
    }
  }

  private randomString (length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

}
