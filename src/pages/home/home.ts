import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipesProvider } from '../../providers/recipes/recipes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  recipes;

  searching = false;
  ingrQuery = '';
  ctgQuery = '';
  titleQuery = '';

  sortType = 'date';
  sortDesc = true;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public recipeService: RecipesProvider
  ) {

  }

  ionViewDidLoad(){
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
    });
  }

  doRefresh(refresher) {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      refresher.complete();
    });
  }

  toggleSearch() {
    this.searching = !this.searching;
  }

  showSortOptions() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sortieren nach',
      buttons: [
        {
          text: 'Datum',
          handler: () => {
            this.sortType = 'date';
          }
        },
        {
          text: 'Wie oft gekocht?',
          handler: () => {
            this.sortType = 'cook-counter';
          }
        },
        {
          text: 'Dauer',
          handler: () => {
            this.sortType = 'duration';
          }
        },
        {
          text: 'Schwierigkeit',
          handler: () => {
            this.sortType = 'difficulty';
          }
        },
        {
          text: 'Anzahl der Zutaten',
          handler: () => {
            this.sortType = 'ingredient-count';
          }
        }
      ]
    });

    actionSheet.present();
  }

  viewRecipe(recipe){
    this.navCtrl.push(RecipeDetailsPage, {
      recipe: recipe
    });
  }

}
