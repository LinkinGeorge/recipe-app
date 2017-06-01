import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  cloudPlan = '';
  cloudList = '';
  time = '19:30';
  servings = '2';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public settings: SettingsProvider,
    public api: RecipesProvider
  ) { 
    this.settings.getPlanCode().then((code) => {
      if (code) {
        this.cloudPlan = code;
      }
    });
    this.settings.getListCode().then((code) => {
      if (code) {
        this.cloudList = code;
      }
    });
    this.settings.getDefaultTime().then((time) => {
      if (time) {
        this.time = time;
      }
    });
    this.settings.getDefaultServings().then((serv) => {
      if (serv) {
        this.servings = serv.toString();
      }
    });
  }

  save() {
    if (this.cloudPlan !== '') {
      this.api.getPlan(this.cloudPlan)
      .subscribe(res => {
        if (res === null) {
          this.api.newPlan(this.cloudPlan)
          .subscribe(() => {
            this.settings.setPlanCode(this.cloudPlan);
          });
        } else {
            this.settings.setPlanCode(this.cloudPlan);
        }
      });
    }
    if (this.cloudList !== '') {
      this.api.getList(this.cloudList)
      .subscribe(res => {
        if (res === null) {
          this.api.newList(this.cloudList)
          .subscribe(() => {
            this.settings.setListCode(this.cloudList);
          });
        } else {
            this.settings.setListCode(this.cloudList);
        }
      });
    }
    this.settings.setDefaultTime(this.time);
    this.settings.setDefaultServings(+this.servings);
    this.navCtrl.pop();
  }

}
