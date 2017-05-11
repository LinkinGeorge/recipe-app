import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecipeDetailsPage } from '../pages/recipe-details/recipe-details';
import { RecipesProvider } from '../providers/recipes/recipes';
import { FilterRecipesPipe } from '../pipes/filter-recipes/filter-recipes';
import { ThumbnailPipe } from '../pipes/thumbnail/thumbnail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecipeDetailsPage,
    FilterRecipesPipe,
    ThumbnailPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
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