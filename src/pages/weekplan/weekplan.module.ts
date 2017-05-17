import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { WeekplanPage } from './weekplan';

@NgModule({
  declarations: [
    WeekplanPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekplanPage),
    PipesModule
  ],
  exports: [
    WeekplanPage
  ]
})
export class WeekplanPageModule {}
