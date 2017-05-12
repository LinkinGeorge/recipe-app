import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { MarkdownModule } from 'angular2-markdown';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecipeDetailsPage } from '../pages/recipe-details/recipe-details';
import { RecipesProvider } from '../providers/recipes/recipes';
import { FilterRecipesPipe } from '../pipes/filter-recipes/filter-recipes';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';
import { DifficultyStringPipe } from '../pipes/difficulty-string/difficulty-string';
import { CalcServingsPipe } from '../pipes/calc-servings/calc-servings';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '811a5500'
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecipeDetailsPage,
    FilterRecipesPipe,
    ThumbnailPipe,
    DifficultyStringPipe,
    CalcServingsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MarkdownModule.forRoot(),
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecipeDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RecipesProvider
  ]
})
export class AppModule {}
