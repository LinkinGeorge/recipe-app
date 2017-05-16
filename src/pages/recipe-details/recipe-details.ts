import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, ActionSheetController } from 'ionic-angular';

import { PlanEntry } from '../../models/plan-entry';

import { ConverterPage } from '../converter/converter';
import { RecipeFormPage } from '../recipe-form/recipe-form';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {
  recipe;
  
  cookCount: number;
  servings: number;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams, 
    public recipeService: RecipesProvider, 
    public localStorage: LocalStorageProvider
  ) {
    this.recipe = this.navParams.get('recipe');
    this.cookCount = this.recipe.cookCount;
    this.servings = this.recipe.servings;
  }

  addIngredient(ingr: string) {
    this.localStorage.addItem(ingr);
    const message = ingr + ' zur Liste hinzugefügt';
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  editRecipe() {
    this.navCtrl.push(RecipeFormPage, {
      recipe: this.recipe
    });
  }

  increaseCookCount() {
    this.cookCount++;
    this.recipe.cookCount = this.cookCount;
    this.recipeService.updateRecipe(this.recipe).subscribe();
  }

  showConverter() {
    let converterModal = this.modalCtrl.create(ConverterPage);
    converterModal.present();
  }

  selectDay() {
    const today = new Date(Date.now());
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Welcher Tag?',
      buttons: [
        {
          text: this.getWeekdayString(today),
          handler: () => {
            this.localStorage.addRecipe(new PlanEntry(this.recipe, today, ''));
            this.showWeekplanToast(today);
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 1)),
          handler: () => {
            this.localStorage.addRecipe(new PlanEntry(this.recipe, this.addDays(today, 1), ''));
            this.showWeekplanToast(this.addDays(today, 1));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 2)),
          handler: () => {
            this.localStorage.addRecipe(new PlanEntry(this.recipe, this.addDays(today, 2), ''));
            this.showWeekplanToast(this.addDays(today, 2));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 3)),
          handler: () => {
            this.localStorage.addRecipe(new PlanEntry(this.recipe, this.addDays(today, 3), ''));
            this.showWeekplanToast(this.addDays(today, 3));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 4)),
          handler: () => {
            this.localStorage.addRecipe(new PlanEntry(this.recipe, this.addDays(today, 4), ''));
            this.showWeekplanToast(this.addDays(today, 4));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 5)),
          handler: () => {
            this.localStorage.addRecipe(new PlanEntry(this.recipe, this.addDays(today, 5), ''));
            this.showWeekplanToast(this.addDays(today, 5));
          }
        },
        {
          text: this.getWeekdayString(this.addDays(today, 6)),
          handler: () => {
            this.localStorage.addRecipe(new PlanEntry(this.recipe, this.addDays(today, 6), ''));
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

}
