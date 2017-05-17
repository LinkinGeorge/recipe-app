import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { DndModule } from 'ng2-dnd';
import { RecipeFormPage } from './recipe-form';

@NgModule({
  declarations: [
    RecipeFormPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeFormPage),
    ComponentsModule,
    DndModule
  ],
  exports: [
    RecipeFormPage
  ]
})
export class RecipeFormPageModule {}
