import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    public navParams: NavParams, 
    public recipeService: RecipesProvider, 
    public shoppingListService: ShoppingListProvider
  ) {
    this.recipe = this.navParams.get('recipe');
    this.servings = this.recipe.servings;
  }

  addIngredient(ingr: string) {
    
    this.shoppingListService.addItem(ingr);
  }

}
