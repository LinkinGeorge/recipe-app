import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeDetailsMenuPage } from './recipe-details-menu';

@NgModule({
  declarations: [
    RecipeDetailsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeDetailsMenuPage),
  ],
  exports: [
    RecipeDetailsMenuPage
  ]
})
export class RecipeDetailsMenuPageModule {}
