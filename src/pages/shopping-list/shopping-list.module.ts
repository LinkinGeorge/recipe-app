import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListPage } from './shopping-list';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ShoppingListPage
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListPage),
    DirectivesModule
  ],
  exports: [
    ShoppingListPage
  ]
})
export class ShoppingListPageModule {}