import { Component } from '@angular/core';
import { Brightness } from '@ionic-native/brightness';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, NavParams, NavController, ViewController, ToastController, ActionSheetController, ModalController } from 'ionic-angular';

import { PlanEntry } from '../../models/plan-entry';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { SettingsProvider } from '../../providers/settings/settings';

@IonicPage()
@Component({
  selector: 'page-recipe-details-menu',
  templateUrl: 'recipe-details-menu.html',
})
export class RecipeDetailsMenuPage {
  time = '19:30';
  servings = 2;
  recipe;

  constructor(
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public recipeService: RecipesProvider,
    public localStorage: LocalStorageProvider,
    public settings: SettingsProvider,
    public brightness: Brightness,
    public social: SocialSharing
  ) {
    this.settings.getDefaultTime().then((time) => {
      if (time) {
        this.time = time;
      }
    });
    this.settings.getDefaultServings().then((serv) => {
      if (serv) {
        this.servings = serv;
      }
    });
    this.recipe = this.params.get('recipe');
  }

  editRecipe() {
    let editModal = this.modalCtrl.create('RecipeFormPage', {
      recipe: this.recipe
    });
    editModal.onDidDismiss(() => {
      this.viewCtrl.dismiss();
    });
    editModal.present();
  }

  increaseCookCount() {
    this.recipe.cookCount++;
    this.recipeService.updateRecipe(this.recipe).subscribe(() => {
      this.viewCtrl.dismiss();
    });
  }

  cookingMode() {
    this.brightness.getBrightness().then((bright) => {
      this.brightness.setKeepScreenOn(true);
      this.brightness.setBrightness(1).then(() => {
        this.viewCtrl.dismiss(bright);
      });
    });
  }

  share() {
    this.social.share('Ich kann '+this.recipe.title+' nur weiterempfehlen:', this.recipe.title, null, 'https://georgs-recipes.herokuapp.com/recipe/'+this.recipe._id).then(() => {
      this.viewCtrl.dismiss();
    }).catch(error => {
      let toast = this.toastCtrl.create({
        message: 'Es ist ein Fehler aufgetreten: '+error,
        duration: 1500
      });
      toast.present();
      this.viewCtrl.dismiss();
    });
  }

  selectDay() {
    const today = new Date(Date.now());
    const id = this.randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Welcher Tag?',
      buttons: [
        {
          text: this.getWeekdayString(today),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry({id: this.recipe._id, title: this.recipe.title}, today, '', this.time, this.servings, id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(today);
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 1)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry({id: this.recipe._id, title: this.recipe.title}, this.addDays(today, 1), '', this.time, this.servings, id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 1));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 2)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry({id: this.recipe._id, title: this.recipe.title}, this.addDays(today, 2), '', this.time, this.servings, id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 2));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 3)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry({id: this.recipe._id, title: this.recipe.title}, this.addDays(today, 3), '', this.time, this.servings, id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 3));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 4)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry({id: this.recipe._id, title: this.recipe.title}, this.addDays(today, 4), '', this.time, this.servings, id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 4));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 5)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry({id: this.recipe._id, title: this.recipe.title}, this.addDays(today, 5), '', this.time, this.servings, id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 5));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 6)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry({id: this.recipe._id, title: this.recipe.title}, this.addDays(today, 6), '', this.time, this.servings, id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 6));
          }
        }
      ]
    });
    actionSheet.present();
  }

  addDays(date: Date, days: number): Date {
    const newDate = new Date();
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  getWeekdayString(date: Date): string {
    if (date.getDay() === new Date(Date.now()).getDay()) {
      return 'Heute'
    }
    if (date.getDay() === new Date(Date.now()).getDay() + 1) {
      return 'Morgen'
    }
    switch (date.getDay()) {
      case 0:
        return 'Sonntag'
      case 1:
        return 'Montag'
      case 2:
        return 'Dienstag'
      case 3:
        return 'Mittwoch'
      case 4:
        return 'Donnerstag'
      case 5:
        return 'Freitag'
      case 6:
        return 'Samstag'
    
      default:
        return 'Niemals'
    }
  }

  private showWeekplanToast(date: Date) {
    const message = this.getWeekdayString(date) + ' gibt es ' + this.recipe.title;
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present(); 
  } 

  private randomString (length, chars) {
    let result = '';
    for (let i = length; i > 0; --i) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

}
