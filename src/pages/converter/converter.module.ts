import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConverterPage } from './converter';

@NgModule({
  declarations: [
    ConverterPage,
  ],
  imports: [
    IonicPageModule.forChild(ConverterPage),
  ],
  exports: [
    ConverterPage
  ]
})
export class ConverterPageModule {}
