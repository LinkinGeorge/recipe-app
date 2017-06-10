import { Component } from '@angular/core';
import { Brightness } from '@ionic-native/brightness';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicPage, NavController, NavParams, ToastController, ModalController, PopoverController } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { SettingsProvider } from '../../providers/settings/settings';
import { FavoritesProvider } from '../../providers/favorites/favorites';

@IonicPage()
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html',
})
export class RecipeDetailsPage {
  recipe;
  
  cookCount: number;
  servings: number;
  favorite: boolean;

  heroLoaded = false;
  descrLoaded = false;

  origBrightness: number;

  constructor(
    public navParams: NavParams, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public localStorage: LocalStorageProvider,
    public recipeService: RecipesProvider,
    public settings: SettingsProvider,
    public favoriteService: FavoritesProvider,
    public brightness: Brightness,
    public social: SocialSharing
  ) {
    this.settings.getDefaultServings().then(servings => {
      if (servings !== null) {
        this.servings = servings;
      }
    });
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
      this.favorite = this.favoriteService.isFavorite(id);
    });
  }

  ionViewWillLeave() {
    if (this.origBrightness) {
      this.brightness.setKeepScreenOn(false);
      this.brightness.setBrightness(this.origBrightness);
    }
  }

  showMenu(event) {
    let popover = this.popoverCtrl.create('RecipeDetailsMenuPage',{
      recipe: this.recipe
    });
    popover.onDidDismiss((brightness) => {
      if (brightness) {
        this.origBrightness = brightness;
      } else {
        this.recipeService.getRecipe(this.recipe._id).subscribe(recipe => {
          this.recipe = recipe;
        }, error => {
          let toast = this.toastCtrl.create({
            message: 'Keine Internetverbindung',
            duration: 1500
          });
          toast.present();
        });
      }
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

  share() {
    this.social.share('Ich kann '+this.recipe.title+' nur weiterempfehlen:', this.recipe.title, null, 'https://georgs-recipes.herokuapp.com/recipe/'+this.recipe._id).then(() => { }).catch(error => {
      let toast = this.toastCtrl.create({
        message: 'Es ist ein Fehler aufgetreten: '+error,
        duration: 1500
      });
      toast.present();
    });
  }

  toggleFavorite() {
    if (!this.favorite) {
      this.favoriteService.addFavorite(this.recipe._id).then(() => {
        this.favorite = true;
      });
    } else {
      this.favoriteService.removeFavorite(this.recipe._id).then(() => {
        this.favorite = false;
      });
    }
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
