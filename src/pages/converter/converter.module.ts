import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { ConverterPage } from './converter';

@NgModule({
  declarations: [
    ConverterPage,
  ],
  imports: [
    IonicPageModule.forChild(ConverterPage),
    PipesModule
  ],
  exports: [
    ConverterPage
  ]
})
export class ConverterPageModule {}
