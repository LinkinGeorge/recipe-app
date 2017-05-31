import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, PopoverController } from 'ionic-angular';

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

  heroLoaded = false;
  descrLoaded = false;

  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public localStorage: LocalStorageProvider
  ) {
  }

  ionViewWillEnter() {
    const id = this.navParams.get('recipeId');
    const paramServings = this.navParams.get('servings');
    this.localStorage.getRecipe(id).then((recipe) => {
      this.recipe = recipe;
      this.cookCount = this.recipe.cookCount;
      if (paramServings === null) {
        this.servings = this.recipe.servings;
      } else {
        this.servings = paramServings
      }
    })
  }

  showMenu(event) {
    let popover = this.popoverCtrl.create('RecipeDetailsMenuPage',{
      recipe: this.recipe
    });
    popover.present({
      ev: event,
    });
  }

  servingsChange(servings: number) {
    this.servings = servings;
  }

  addToList(ingr: string) {
    this.localStorage.addItem(ingr);
    const message = ingr + ' zur Liste hinzugefügt';
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }

  showConverter() {
    let converterModal = this.modalCtrl.create('ConverterPage');
    converterModal.present();
  }

  addServing() {
    this.servings = this.servings + 1;
  }

  removeServing() {
    if (this.servings > 1) {
      this.servings = this.servings - 1;
    }
  }

}
