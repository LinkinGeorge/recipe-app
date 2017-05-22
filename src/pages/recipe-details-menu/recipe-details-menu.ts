import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, ViewController, ToastController, ActionSheetController } from 'ionic-angular';

import { PlanEntry } from '../../models/plan-entry';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-recipe-details-menu',
  templateUrl: 'recipe-details-menu.html',
})
export class RecipeDetailsMenuPage {
  recipe;

  constructor(
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public recipeService: RecipesProvider,
    public localStorage: LocalStorageProvider
  ) {
    this.recipe = this.params.get('recipe');
  }

  editRecipe() {
    this.viewCtrl.dismiss().then(() => {
      this.navCtrl.push('RecipeFormPage', {
        recipe: this.recipe
      });
    });
  }

  increaseCookCount() {
    this.recipe.cookCount++;
    this.recipeService.updateRecipe(this.recipe).subscribe(() => {
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
            this.localStorage.addEntry(new PlanEntry(this.recipe, today, '', id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(today);
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 1)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry(this.recipe, this.addDays(today, 1), '', id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 1));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 2)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry(this.recipe, this.addDays(today, 2), '', id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 2));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 3)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry(this.recipe, this.addDays(today, 3), '', id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 3));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 4)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry(this.recipe, this.addDays(today, 4), '', id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 4));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 5)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry(this.recipe, this.addDays(today, 5), '', id));
            this.viewCtrl.dismiss();
            this.showWeekplanToast(this.addDays(today, 5));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 6)),
          handler: () => {
            this.localStorage.addEntry(new PlanEntry(this.recipe, this.addDays(today, 6), '', id));
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
