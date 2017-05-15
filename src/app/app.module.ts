import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MarkdownModule } from 'angular2-markdown';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { ShoppingListMenuPage } from '../pages/shopping-list-menu/shopping-list-menu';
import { RecipeDetailsPage } from '../pages/recipe-details/recipe-details';
import { WeekplanPage } from '../pages/weekplan/weekplan';
import { ConverterPage } from '../pages/converter/converter';

import { RecipesProvider } from '../providers/recipes/recipes';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';

import { FilterRecipesPipe } from '../pipes/filter-recipes/filter-recipes';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';
import { DifficultyStringPipe } from '../pipes/difficulty-string/difficulty-string';
import { CalcServingsPipe } from '../pipes/calc-servings/calc-servings';
import { SortRecipesPipe } from '../pipes/sort-recipes/sort-recipes';
import { RoundPipe } from '../pipes/round/round';
import { WeekdayPipe } from '../pipes/weekday/weekday';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '811a5500'
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShoppingListPage,
    ShoppingListMenuPage,
    RecipeDetailsPage,
    WeekplanPage,
    ConverterPage,
    FilterRecipesPipe,
    ThumbnailPipe,
    DifficultyStringPipe,
    CalcServingsPipe,
    SortRecipesPipe,
    RoundPipe,
    WeekdayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MarkdownModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShoppingListPage,
    ShoppingListMenuPage,
    RecipeDetailsPage,
    WeekplanPage,
    ConverterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecipesProvider,
    LocalStorageProvider
  ]
})
export class AppModule {}
