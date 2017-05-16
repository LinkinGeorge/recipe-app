import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NumberPickerComponent } from './number-picker';

@NgModule({
  declarations: [
    NumberPickerComponent,
  ],
  imports: [
    IonicPageModule.forChild(NumberPickerComponent),
  ],
  exports: [
    NumberPickerComponent
  ]
})
export class NumberPickerComponentModule {}
