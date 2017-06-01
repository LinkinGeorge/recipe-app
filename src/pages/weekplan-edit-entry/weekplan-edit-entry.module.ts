import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekplanEditEntryPage } from './weekplan-edit-entry';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WeekplanEditEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekplanEditEntryPage),
    ComponentsModule
  ],
  exports: [
    WeekplanEditEntryPage
  ]
})
export class WeekplanEditEntryPageModule {}
