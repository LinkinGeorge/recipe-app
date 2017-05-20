import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { IonicPage, Content, NavController, ActionSheetController, ToastController, PopoverController } from 'ionic-angular';

import { RecipesProvider } from '../../providers/recipes/recipes';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  start = 0;
  threshold = 100;
  slideHeaderPrevious = 0;
  ionScroll:any;
  showheader:boolean;
  hideheader:boolean;
  headercontent:any;

  recipes;

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
    public localStorage: LocalStorageProvider
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
  }

  showMenu(event) {
    console.log('Test');
    let popover = this.popoverCtrl.create('HomeMenuPage',{
      sortType: this.sortType,
      sortDesc: this.sortDesc
    });
    popover.onDidDismiss(data => {
      if (data) {
        this.sortDesc = data.sortDesc;
        this.sortType = data.sortType;
      }
    })
    popover.present({
      ev: event,
    });
  }

  doRefresh(refresher) {
    this.recipeService.getAllRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.localStorage.setRecipes(recipes);
      refresher.complete();
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

  categoryFiltered(ctg: string):boolean {
    return this.query.trim().toLowerCase().includes(ctg.trim().toLowerCase());
  }

  toggleFab() {
    this.fabActive = !this.fabActive;
  }

}
