import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recipes;

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

}
