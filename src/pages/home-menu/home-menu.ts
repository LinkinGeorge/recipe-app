import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';

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
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController
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

}
