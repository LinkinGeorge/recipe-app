import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController, PopoverController } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { SettingsProvider } from '../../providers/settings/settings';

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
    public localStorage: LocalStorageProvider,
    public recipeService: RecipesProvider,
    public settings: SettingsProvider
  ) {
    this.settings.getDefaultServings().then(servings => {
      if (servings !== null) {
        this.servings = servings;
      }
    })
  }

  ionViewWillEnter() {
    const id = this.navParams.get('recipeId');
    const paramServings = this.navParams.get('servings');
    this.localStorage.getRecipe(id).then((recipe) => {
      this.recipe = recipe;
      this.cookCount = this.recipe.cookCount;
      if (!paramServings && !this.servings) {
        this.servings = this.recipe.servings;
      } else if (paramServings) {
        this.servings = paramServings;
      }
    });
  }

  showMenu(event) {
    let popover = this.popoverCtrl.create('RecipeDetailsMenuPage',{
      recipe: this.recipe
    });
    popover.onDidDismiss(() => {
      this.recipeService.getRecipe(this.recipe._id).subscribe(recipe => {
        this.recipe = recipe;
      }, error => {
        let toast = this.toastCtrl.create({
          message: 'Keine Internetverbindung',
          duration: 1500
        });
        toast.present();
      }
      );
    });
    popover.present({
      ev: event,
    });
  }

  doRefresh(refresher) {
    this.recipeService.getRecipe(this.recipe._id).subscribe(recipe => {
      this.recipe = recipe;
      refresher.complete();
    }, error => {
      refresher.complete();
      let toast = this.toastCtrl.create({
        message: 'Keine Internetverbindung',
        duration: 1500
      });
      toast.present();
    }
    );
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

}
