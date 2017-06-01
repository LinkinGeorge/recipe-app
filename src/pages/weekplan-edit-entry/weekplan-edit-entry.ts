import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-weekplan-edit-entry',
  templateUrl: 'weekplan-edit-entry.html',
})
export class WeekplanEditEntryPage {
  entry;
  time:string;
  servings:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.entry = this.navParams.get('entry');
    this.time = this.entry.time;
    this.servings = this.entry.servings;
  }

  update() {
    this.entry.time = this.time;
    this.entry.servings = this.servings;
    this.viewCtrl.dismiss(this.entry);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  servingsChange(servings: number) {
    this.servings = servings;
  }

}
