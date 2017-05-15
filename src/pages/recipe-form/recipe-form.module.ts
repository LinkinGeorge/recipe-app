import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeFormPage } from './recipe-form';

@NgModule({
  declarations: [
    RecipeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeFormPage),
  ],
  exports: [
    RecipeFormPage
  ]
})
export class RecipeFormPageModule {}
