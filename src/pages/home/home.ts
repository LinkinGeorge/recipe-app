import { Component, ViewChild, ElementRef, Renderer, OnInit } from '@angular/core';
import { IonicPage, Content, NavController, ActionSheetController, ToastController, PopoverController } from 'ionic-angular';
import { Deploy } from '@ionic/cloud-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { FavoritesProvider } from '../../providers/favorites/favorites';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild(Content) content: Content;
  start = 0;
  threshold = 100;
  slideHeaderPrevious = 0;
  ionScroll:any;
  showheader:boolean;
  hideheader:boolean;
  headercontent:any;

  recipes;
  weekplan = [];
  favorites: string[];

  query = '';

  fabActive = false;

  sortType = 'date';
  sortDesc = true;

  constructor(
    public renderer: Renderer,
    public myElement: ElementRef,
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    public recipeService: RecipesProvider,
    public localStorage: LocalStorageProvider,
    public favoriteService: FavoritesProvider,
    public deploy: Deploy
  ) {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.localStorage.setRecipes(recipes);
    }, error => {
      this.localStorage.getRecipes().then((recipes) => {
        if (recipes) {
          this.recipes = JSON.parse(recipes);
        }
      });
      let toast = this.toastCtrl.create({
        message: 'Keine Internetverbindung',
        duration: 1500
      });
      toast.present();
    }
    );
    this.localStorage.downloadPlan().then(() => {
      this.localStorage.getPlan().then((plan) => {
        if (plan) {
          this.weekplan = JSON.parse(plan);
        }
      });
    });
  }

  ngOnInit() {
    // Ionic scroll element
    this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
    // On scroll function
    this.ionScroll.addEventListener("scroll", () => {
      if (this.ionScroll.scrollTop - this.start > this.threshold) {
        this.showheader = true;
        this.hideheader = false;
      } else {
        this.showheader = false;
        this.hideheader = true;
      }
      if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
        this.showheader = false;
        this.hideheader = true;
      }
      this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
    });
    // Check for updates
    this.checkForUpdates();
    // Check for old snapshots
    this.deleteOldSnapshots();
  }

  showMenu(event) {
    let popover = this.popoverCtrl.create('HomeMenuPage',{
      sortType: this.sortType,
      sortDesc: this.sortDesc
    });
    popover.onDidDismiss(data => {
      if (data) {
        this.sortDesc = data.sortDesc;
        this.sortType = data.sortType;
      } else {
      this.recipeService.getAllRecipes().subscribe(
        recipes => {
          this.recipes = recipes;
          this.localStorage.setRecipes(recipes);
        }, error => {
          this.localStorage.getRecipes().then((recipes) => {
            if (recipes) {
              this.recipes = JSON.parse(recipes);
            }
          });
        }
      );} 
    });
    popover.present({
      ev: event,
    });
  }

  doRefresh(refresher) {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.localStorage.setRecipes(recipes).then(() => {
        refresher.complete();
      });
    }, error => {
      this.localStorage.getRecipes().then((recipes) => {
        if (recipes) {
          this.recipes = JSON.parse(recipes);
          refresher.complete();
        }
      });
      let toast = this.toastCtrl.create({
        message: 'Keine Internetverbindung',
        duration: 1500
      });
      toast.present();
    }
    );
    this.localStorage.downloadPlan().then(() => {
      this.localStorage.getPlan().then((plan) => {
        if (plan) {
          this.weekplan = JSON.parse(plan);
        }
      });
    });
  }

  viewRecipe(recipe) {
    this.navCtrl.push('RecipeDetailsPage', {
      recipeId: recipe._id
    });
  }

  newRecipe() {
    this.navCtrl.push('RecipeFormPage');
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
    if (!this.query.includes(ctg)) {
      // the category is not present in the query
      if (this.query === '') {
        this.query = ctg;
      } else {
        this.query = this.query.concat(', ' + ctg);
      }
    } else {
      // category already present in query
      if (this.query.includes(',')) {
        // there are multiple categories in query
        if (this.query.endsWith(ctg)) {
          this.query = this.query.replace((', ' + ctg), '');
        } else {
          this.query = this.query.replace((ctg + ', '), '');
        }
      } else {
        this.query = '';
      }
    }
  }

  toggleFavorites() {
    if (this.favorites) {
      this.favorites = null;
    } else {
      this.favoriteService.getFavorites().then((favs) => {
        this.query = '';
        this.favorites = favs;
      });
    }
  }

  categoryFiltered(ctg: string):boolean {
    return this.query.trim().toLowerCase().includes(ctg.trim().toLowerCase());
  }

  toggleFab() {
    this.fabActive = !this.fabActive;
  }
    
  private deleteOldSnapshots() {
    this.deploy.getSnapshots().then((snapshots) => {
      // snapshots will be an array of snapshot uuids
      this.deploy.info().then((x) => {
        let deleted = 0;
        for (let suuid of snapshots) {
          if (suuid !== x.deploy_uuid) {
            deleted++;
            this.deploy.deleteSnapshot(suuid);
          }
        }
        let message = '';
        deleted === 1 ? message = '1 alte Version gelöscht.' : message = deleted + ' alte Versionen gelöscht.';
        const toast = this.toastCtrl.create({
          message: message,
          duration: 1500
        });
        if (deleted !== 0) {
          toast.present();
        }
      });
    }, error => {
      console.warn(error);
    });
  }

  private checkForUpdates() {
    this.deploy.check().then(available => {
      if (available) {
        let toast = this.toastCtrl.create({
          message: 'Es ist ein neues Update verfügbar',
          duration: 1500
        });
        toast.present();
      }
    }, error => { });
  }

}
