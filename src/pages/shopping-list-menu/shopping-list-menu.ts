import { Component } from '@angular/core';
import { IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { Deploy } from '@ionic/cloud-angular';

@IonicPage()
@Component({
  selector: 'page-shopping-list-menu',
  templateUrl: 'shopping-list-menu.html',
})
export class ShoppingListMenuPage {

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public deploy: Deploy) {}

  checkForUpdate() {
   const checking = this.loadingCtrl.create({
     content: 'Suche nach Updates...'
   });
   checking.present();

  this.deploy.check().then((snapshotAvailable: boolean) => {
      checking.dismiss();
      if (snapshotAvailable) {
        this.downloadAndInstall();
      } else {
        const toast = this.toastCtrl.create({
          message: 'Kein Update verfügbar',
          duration: 3000
        });
        toast.present();
      }
    }, (error) => {
      checking.dismiss();
      const toast = this.toastCtrl.create({
          message: 'Es ist ein Fehler bei der Update-Abfrage aufgetreten.',
          duration: 3000
        });
        toast.present();
    });
  }

  private downloadAndInstall() {
    const updating = this.loadingCtrl.create({
      content: 'Updates werden installiert...'
    });
    updating.present();
    this.deploy.download().then(() => this.deploy.extract()).then(() => this.deploy.load());
  }

}
