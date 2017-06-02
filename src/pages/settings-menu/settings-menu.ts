import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Deploy } from '@ionic/cloud-angular';

@IonicPage()
@Component({
  selector: 'page-settings-menu',
  templateUrl: 'settings-menu.html',
})
export class SettingsMenuPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public deploy: Deploy
  ) { }

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
          message: 'Es ist ein Fehler bei der Update-Abfrage aufgetreten: ' + error,
          duration: 3000
        });
        toast.present();
      });
  }
  
  deleteOldSnapshots() {
    this.deploy.getSnapshots().then((snapshots) => {
      // snapshots will be an array of snapshot uuids
      this.deploy.info().then((x) => {
        let deleted = 0;
        for (let suuid of snapshots) {
          if (suuid !== x.deploy_uuid) {
            deleted++;
            this.deploy.deleteSnapshot(suuid);
          }
        }
        let message = '';
        deleted === 1 ? message = '1 alte Version gelöscht.' : message = deleted + ' alte Versionen gelöscht.';
        const toast = this.toastCtrl.create({
          message: message,
          duration: 1500
        });
        toast.present();
        this.viewCtrl.dismiss();
      });
    }, (error) => {
      const toast = this.toastCtrl.create({
        message: 'Es ist ein Fehler aufgetreten: ' + error,
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss();
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
