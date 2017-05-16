import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-weekplan-new-entry',
  templateUrl: 'weekplan-new-entry.html',
})
export class WeekplanNewEntryPage {
  day = "0";

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {

  }

  save(title) {
    let data = {
      title: title,
      day: +this.day
    }
    this.viewCtrl.dismiss(data);
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
