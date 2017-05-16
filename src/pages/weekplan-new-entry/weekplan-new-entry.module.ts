import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekplanNewEntryPage } from './weekplan-new-entry';

@NgModule({
  declarations: [
    WeekplanNewEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekplanNewEntryPage),
  ],
  exports: [
    WeekplanNewEntryPage
  ]
})
export class WeekplanNewEntryPageModule {}
