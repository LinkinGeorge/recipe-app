import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';

import { Recipe, Ingredient } from '../../models/recipe';
import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

import { Environment } from '../../environment';

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

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public recipeService: RecipesProvider,
    public localStorage: LocalStorageProvider,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController
  ) {
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
    this.model.ingredients = this.ingredients.slice(0);
    if (this.categories.length > 0) {
      this.model.categories = this.categories.slice(0);
    }
    if (this.newRecipe) {
      this.recipeService.newRecipe(this.model)
        .subscribe(
          (recipe) => {
<<<<<<< HEAD
            this.localStorage.addRecipe(this.model);
            this.navCtrl.pop();
=======
            this.localStorage.addRecipe(this.model).then(() => {
              this.navCtrl.pop();
            });
>>>>>>> 54568ff5b4c737f32d59481da2f11deb8b8239ea
          },
          (error) => {
            let toast = this.toastCtrl.create({
              message: 'Konnte nicht gespeichert werden. Bitte stell sicher, dass du mit dem Internet verbunden bist.',
              duration: 1500
            });
            toast.present();
          });
        
    } else {
      this.recipeService.updateRecipe(this.model)
        .subscribe(
          (recipe) => {
<<<<<<< HEAD
            this.localStorage.updateRecipe(this.model);
            this.navCtrl.pop();
=======
            this.localStorage.updateRecipe(this.model).then(() => {
              this.navCtrl.pop();
            });
>>>>>>> 54568ff5b4c737f32d59481da2f11deb8b8239ea
          },
          (error) => {
            let toast = this.toastCtrl.create({
              message: 'Konnte nicht gespeichert werden. Bitte stell sicher, dass du mit dem Internet verbunden bist.',
              duration: 1500
            });
            toast.present();
            this.navCtrl.pop();
          });
    }
  }

  servingsChange(servings: number) {
    this.model.servings = servings;
  }

  durationChange(duration: number) {
    this.model.duration = duration;
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

  editIngredient(ingr, index, event) {
    let editPopover = this.popoverCtrl.create('RecipeFormEditPage', {ingredient: ingr});
    editPopover.onDidDismiss(ingredient => {
      if (ingredient) {
        this.ingredients.splice(index, 1, ingredient)
      }
    });
    editPopover.present({
      ev: event
    });
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
    const client = filestack.init(Environment.filestackKey);
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
    const client = filestack.init(Environment.filestackKey);
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
