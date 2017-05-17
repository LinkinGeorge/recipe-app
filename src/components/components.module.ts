import { IonicModule } from 'ionic-angular';
import { NumberPickerComponent } from './number-picker/number-picker';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    NumberPickerComponent
  ],
  imports: [
    IonicModule
  ],
  exports: [
    NumberPickerComponent
  ]
})
export class ComponentsModule {}