import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipesProvider } from '../../providers/recipes/recipes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recipes;

  ingrQuery = '';
  ctgQuery = '';
  titleQuery = '';

  constructor(
    public navCtrl: NavController,
    public recipeService: RecipesProvider
  ) {

  }

  ionViewDidLoad(){
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  viewRecipe(recipe){
    this.navCtrl.push(RecipeDetailsPage, {
      recipe: recipe
    });
  }

}
