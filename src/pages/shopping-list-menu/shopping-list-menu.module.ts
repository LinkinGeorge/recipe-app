import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShoppingListMenuPage } from './shopping-list-menu';

@NgModule({
  declarations: [
    ShoppingListMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ShoppingListMenuPage),
  ],
  exports: [
    ShoppingListMenuPage
  ]
})
export class ShoppingListMenuPageModule {}
