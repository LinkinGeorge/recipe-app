import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
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
  oldPlan = '';
  oldList = '';
  lowData = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public settings: SettingsProvider,
    public localStorage: LocalStorageProvider,
    public api: RecipesProvider
  ) { 
    this.settings.getPlanCode().then((code) => {
      if (code) {
        this.cloudPlan = code;
        this.oldPlan = code;
      }
    });
    this.settings.getListCode().then((code) => {
      if (code) {
        this.cloudList = code;
        this.oldList = code;
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
    this.settings.lowDataMode().then((mode) => {
      this.lowData = mode;
    });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  showMenu(event) {
    let popover = this.popoverCtrl.create('SettingsMenuPage');
    popover.present({
      ev: event,
    });
  }

  save() {
    let planPromise = new Promise(
      (resolve, reject) => {
        if (this.cloudPlan == this.oldPlan) {
          resolve();
        }
        this.cloudPlan = this.cloudPlan.trim().replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
        if (this.cloudPlan !== '') {
          this.api.getPlan(this.cloudPlan)
          .subscribe(res => {
            if (res === null) {
              this.api.newPlan(this.cloudPlan)
              .subscribe(() => {
                this.settings.setPlanCode(this.cloudPlan).then(() => {
                  resolve();
                });
              }, error => {
                reject();
              });
            } else {
              this.settings.setPlanCode(this.cloudPlan).then(() => {
                resolve();
              });
            }
          }, error => {
            reject();
          });
        } else {
          this.settings.resetPlanCode().then(() => {
            resolve();
          });
        }
      }
    );
    let listPromise = new Promise(
      (resolve, reject) => {
        if (this.cloudList == this.oldList) {
          resolve();
        }
        this.cloudList = this.cloudList.trim().replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
        if (this.cloudList !== '') {
          this.api.getList(this.cloudList)
          .subscribe(res => {
            if (res === null) {
              this.api.newList(this.cloudList)
              .subscribe(() => {
                this.settings.setListCode(this.cloudList).then(() => {
                  resolve();
                });
              }, error => {
                reject();
              });
            } else {
              this.settings.setListCode(this.cloudList).then(() => {
                resolve();
              });
            }
          }, error => {
            reject();
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
    let lowDataPromise = new Promise(
      resolve => {
        this.settings.setLowDataMode(this.lowData).then(() => {
          resolve();
        });
      }
    );
    Promise.all([planPromise, listPromise, timePromise, servingsPromise, lowDataPromise]).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Erfolgreich gespeichert',
        duration: 2000
      });
      toast.present(); 
      this.navCtrl.pop();
    }).catch(() => {
      let toast = this.toastCtrl.create({
        message: 'Konnte nicht gespeichert werden. Sind Sie mit dem Internet verbunden?',
        duration: 2000
      });
      toast.present();
    });
  }

}
