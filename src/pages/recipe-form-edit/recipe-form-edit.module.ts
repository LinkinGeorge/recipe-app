import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeFormEditPage } from './recipe-form-edit';

@NgModule({
  declarations: [
    RecipeFormEditPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeFormEditPage),
  ],
  exports: [
    RecipeFormEditPage
  ]
})
export class RecipeFormEditPageModule {}
