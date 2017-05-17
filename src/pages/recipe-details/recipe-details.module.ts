import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { MarkdownModule } from 'angular2-markdown';
import { RecipeDetailsPage } from './recipe-details';

@NgModule({
  declarations: [
    RecipeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipeDetailsPage),
    MarkdownModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    RecipeDetailsPage
  ]
})
export class RecipeDetailsPageModule {}
