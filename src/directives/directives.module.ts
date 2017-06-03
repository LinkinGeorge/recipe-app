import { IonicModule } from 'ionic-angular';
import { KeyboardFixDirective } from './keyboard-fix/keyboard-fix';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    KeyboardFixDirective
  ],
  imports: [
    IonicModule
  ],
  exports: [
    KeyboardFixDirective
  ]
})
export class DirectivesModule {}