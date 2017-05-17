import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheetController } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
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
    public recipeService: RecipesProvider,
    public localStorage: LocalStorageProvider
  ) {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.localStorage.setRecipes(recipes);
    });
  }

  ionViewDidEnter(){
    this.localStorage.getRecipes().then((recipes) => {
      this.recipes = JSON.parse(recipes);
    })
  }

  doRefresh(refresher) {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.localStorage.setRecipes(recipes);
      refresher.complete();
    });
  }

  viewRecipe(recipe) {
    this.navCtrl.push('RecipeDetailsPage', {
      recipe: recipe
    });
  }

  newRecipe() {
    this.navCtrl.push('RecipeFormPage');
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

  toggleCategory(ctg: string) {
    if (!this.ctgQuery.includes(ctg)) {
      // the category is not present in the query
      if (this.ctgQuery === '') {
        this.ctgQuery = ctg;
      } else {
        this.ctgQuery = this.ctgQuery.concat(', ' + ctg);
      }
    } else {
      // category already present in query
      if (this.ctgQuery.includes(',')) {
        // there are multiple categories in query
        if (this.ctgQuery.endsWith(ctg)) {
          this.ctgQuery = this.ctgQuery.replace((', ' + ctg), '');
        } else {
          this.ctgQuery = this.ctgQuery.replace((ctg + ', '), '');
        }
      } else {
        this.ctgQuery = '';
      }
    }
  }

}
