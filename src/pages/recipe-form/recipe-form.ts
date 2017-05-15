import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Recipe, Ingredient } from '../../models/recipe';
import { RecipesProvider } from '../../providers/recipes/recipes';

declare const filestack: {
  init(apiKey: string): {
    pick({ accept, maxFiles }: { accept: Array<string>, maxFiles: number, transformations: { crop: { circle: boolean } } }): Promise<{ filesUploaded: { handle: string, filename: string }[] }> 
  }
};

@IonicPage()
@Component({
  selector: 'page-recipe-form',
  templateUrl: 'recipe-form.html',
})
export class RecipeFormPage {
  ingredients;
  categories;
  newIngredient = new Ingredient('', '');
  model;
  
  // helper variables
  ingredientAdded = false;
  heroFilename: string;
  descrFilename: string;

  newRecipe = true;
  editing = false;
  editIngr: number;
  vegetarian: boolean;
  vegan: boolean;

  page: string = 'info';

  constructor(public navCtrl: NavController, public navParams: NavParams, public recipeService: RecipesProvider) {
    if (this.navParams.get('recipe')) {
      this.model = JSON.parse(JSON.stringify(this.navParams.get('recipe')));
      this.categories = this.model.categories;
      this.ingredients = this.model.ingredients;
      this.newRecipe = false;
      this.vegetarian = this.model.categories.includes('Vegetarisch');
      this.vegan = this.model.categories.includes('Vegan');
    } else {
      this.model = new Recipe('', 2, 0, 1, 0, this.ingredients);
      this.categories = [];
      this.ingredients = [new Ingredient( '', '' )];
      this.vegetarian = false;
      this.vegan = false;
    }
  }

  save() {
    this.model.ingredients = this.ingredients;
    if (this.categories.length > 0) {
      this.model.categories = this.categories;
    }
    if (this.newRecipe) {
      this.recipeService.newRecipe(this.model)
        .subscribe((recipe) => {
          this.navCtrl.pop();
        });
    } else {
      this.recipeService.updateRecipe(this.model)
        .subscribe((recipe) => {
          this.navCtrl.pop();
        });
    }
  }

  addIngredient() {
    if (this.newIngredient) {
      const ingr = this.newIngredient;
      this.ingredients.push(ingr);
      this.newIngredient = new Ingredient('', '');
    }
    if (!this.ingredientAdded){
      // Remove initial empty ingredient on first addition
      this.ingredients.splice(0,1);
      this.ingredientAdded = true;
    }
  }

  editIngredient(index) {
    if (this.editing) {
      this.newIngredient = new Ingredient('', '');
      this.editing = false;
    } else {
      this.editing = true;
      this.editIngr = index;
      this.newIngredient = this.ingredients[index];
    }
  }

  updateIngredient(index) {
    this.ingredients[index] = this.newIngredient;
    this.newIngredient = new Ingredient('', '');
    this.editing = false;
  }

  removeIngredient(ingredient) {
    if (this.editing) {
      this.newIngredient = new Ingredient('', '');
      this.editing = false;
    }
    this.ingredients.splice(this.ingredients.indexOf(ingredient), 1);
  }
  
  addCategory(category) {
    if (!this.categories) {
      this.categories.push(category);
    } else if (this.categories.indexOf(category) !== -1) {
      // leave the categories as is
    } else {
      this.categories.push(category);
    }
  }

  removeCategory(category) {
    if (this.hasCategory(category)) {
      this.categories.splice(this.categories.indexOf(category), 1);
    }
  }

  hasCategory(category) {
    return this.categories.includes(category);
  }

  updateVeggieOptions() {
    if (this.vegan) {
      this.addCategory('Vegan');
      this.vegetarian = true;
    } else {
      this.removeCategory('Vegan');
    }
    if (this.vegetarian) {
      this.addCategory('Vegetarisch');
    } else {
      this.removeCategory('Vegetarisch');
    }
  }
  
  async showHeroPicker() {
    const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
    const result = await client.pick({
      accept: ['image/*'],
      maxFiles: 1,
      transformations: {
        crop: {
          circle: false
        }
      }
    });
    const handle = result.filesUploaded[0].handle;
    this.heroFilename = result.filesUploaded[0].filename;
    this.model.heroImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
  }
  
  async showDescPicker() {
    const client = filestack.init('AwD48ceQaWtGBs9plMog7z');
    const result = await client.pick({
      accept: ['image/*'],
      maxFiles: 1,
      transformations: {
        crop: {
          circle: false
        }
      }
    });
    const handle = result.filesUploaded[0].handle;
    this.descrFilename = result.filesUploaded[0].filename;
    this.model.descrImage = 'https://process.filestackapi.com/resize=w:2000,fit:max/quality=value:80/compress/'+handle;
  }

}
