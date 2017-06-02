import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
    public toastCtrl: ToastController,
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
    let planPromise = new Promise(
      resolve => {
        if (this.cloudPlan !== '') {
          this.api.getPlan(this.cloudPlan)
          .subscribe(res => {
            if (res === null) {
              this.api.newPlan(this.cloudPlan)
              .subscribe(() => {
                this.settings.setPlanCode(this.cloudPlan).then(() => {
                  resolve();
                });
              });
            } else {
              this.settings.setPlanCode(this.cloudPlan).then(() => {
                resolve();
              });
            }
          });
        } else {
          this.settings.resetPlanCode().then(() => {
            resolve();
          });
        }
      }
    );
    let listPromise = new Promise(
      resolve => {
        if (this.cloudList !== '') {
          this.api.getList(this.cloudList)
          .subscribe(res => {
            if (res === null) {
              this.api.newList(this.cloudList)
              .subscribe(() => {
                this.settings.setListCode(this.cloudList).then(() => {
                  resolve();
                });
              });
            } else {
              this.settings.setListCode(this.cloudList).then(() => {
                resolve();
              });
            }
          });
        } else {
          this.settings.resetListCode().then(() => {
            resolve();
          });
        }
      }
    );
    let timePromise = new Promise(
      resolve => {
        this.settings.setDefaultTime(this.time).then(() => {
          resolve();
        });
      }
    );
    let servingsPromise = new Promise(
      resolve => {
        this.settings.setDefaultServings(+this.servings).then(() => {
          resolve();
        });
      }
    );
    Promise.all([planPromise, listPromise, timePromise, servingsPromise]).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Erfolgreich gespeichert',
        duration: 2000
      });
      toast.present(); 
      this.navCtrl.pop();
    });
  }

}
