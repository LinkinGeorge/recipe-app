import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListEditPage } from './shopping-list-edit';

@NgModule({
  declarations: [
    ShoppingListEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListEditPage),
  ],
  exports: [
    ShoppingListEditPage
  ]
})
export class ShoppingListEditPageModule {}
