import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipeFormEditPage } from './recipe-form-edit';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    RecipeFormEditPage
  ],
  imports: [
    IonicPageModule.forChild(RecipeFormEditPage),
    DirectivesModule
  ],
  exports: [
    RecipeFormEditPage
  ]
})
export class RecipeFormEditPageModule {}
