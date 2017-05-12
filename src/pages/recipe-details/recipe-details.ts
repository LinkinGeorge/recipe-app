import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';

import { ConverterPage } from '../converter/converter';
import { RecipesProvider } from '../../providers/recipes/recipes';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';

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
    public navParams: NavParams, 
    public recipeService: RecipesProvider, 
    public shoppingListService: ShoppingListProvider
  ) {
    this.recipe = this.navParams.get('recipe');
    this.cookCount = this.recipe.cookCount;
    this.servings = this.recipe.servings;
  }

  addIngredient(ingr: string) {
    this.shoppingListService.addItem(ingr);
    const message = ingr + ' zur Liste hinzugefügt';
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
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

}
