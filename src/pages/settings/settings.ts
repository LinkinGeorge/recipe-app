import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';

import { RecipesProvider } from '../../providers/recipes/recipes';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  cloudPlan = '';
  cloudList = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private appPref: AppPreferences,
    public api: RecipesProvider
  ) { 
    this.appPref.fetch('plan').then((plan) => {
      this.cloudPlan = plan;
    });
    this.appPref.fetch('list').then((list) => {
      this.cloudList = list;
    });
  }

  save() {
    if (this.cloudPlan !== '') {
      this.appPref.store('plan', this.cloudPlan).then(() => {
        this.api.getPlan(this.cloudPlan)
          .subscribe(res => {},
          err => {
            this.api.newPlan(this.cloudPlan)
              .subscribe();
          });
      });
    }
    if (this.cloudList !== '') {
      this.appPref.store('list', this.cloudList);
    }
  }

}
