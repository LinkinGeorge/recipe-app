import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams, ViewController, ToastController, ActionSheetController } from 'ionic-angular';
import { Deploy } from '@ionic/cloud-angular';

@IonicPage()
@Component({
  selector: 'page-home-menu',
  templateUrl: 'home-menu.html',
})
export class HomeMenuPage {
  sortType: string;
  sortDesc: boolean;
  sortString: string;

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public deploy: Deploy
  ) { 
    this.sortType = this.navParams.get('sortType');
    this.sortDesc = this.navParams.get('sortDesc');
    this.sortString = this.sortToString(this.sortDesc);
  }

  newRecipe() {
    this.navCtrl.push('RecipeFormPage');
  }

  sortDirection() {
    this.viewCtrl.dismiss({
      sortType: this.sortType,
      sortDesc: !this.sortDesc
    });
  }

  showSortOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sortieren nach',
      buttons: [
        {
          text: 'Datum',
          handler: () => {
            this.sortType = 'date';
            this.viewCtrl.dismiss({
              sortType: 'date',
              sortDesc: this.sortDesc
            });
          }
        },
        {
          text: 'Wie oft gekocht?',
          handler: () => {
            this.sortType = 'cook-counter';
            this.viewCtrl.dismiss({
              sortType: 'cook-counter',
              sortDesc: this.sortDesc
            });
          }
        },
        {
          text: 'Dauer',
          handler: () => {
            this.sortType = 'duration';
            this.viewCtrl.dismiss({
              sortType: 'duration',
              sortDesc: this.sortDesc
            });
          }
        },
        {
          text: 'Schwierigkeit',
          handler: () => {
            this.sortType = 'difficulty';
            this.viewCtrl.dismiss({
              sortType: 'difficulty',
              sortDesc: this.sortDesc
            });
          }
        },
        {
          text: 'Anzahl der Zutaten',
          handler: () => {
            this.sortType = 'ingredient-count';
            this.viewCtrl.dismiss({
              sortType: 'ingredient-count',
              sortDesc: this.sortDesc
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  sortToString(sortDesc: boolean):string {
    if (sortDesc) {
      return 'Absteigend';
    } else {
      return 'Aufsteigend';
    }
  }

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
