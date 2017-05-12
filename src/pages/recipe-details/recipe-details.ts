import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { ShoppingListProvider } from '../../providers/shopping-list/shopping-list';

/**
 * Generated class for the RecipeDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {
  recipe;
  
  servings: number;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public recipeService: RecipesProvider, 
    public shoppingListService: ShoppingListProvider
  ) {
    this.recipe = this.navParams.get('recipe');
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

}
