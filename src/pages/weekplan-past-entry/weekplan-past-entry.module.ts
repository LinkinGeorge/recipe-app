import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeekplanPastEntryPage } from './weekplan-past-entry';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    WeekplanPastEntryPage,
  ],
  imports: [
    IonicPageModule.forChild(WeekplanPastEntryPage),
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    WeekplanPastEntryPage
  ]
})
export class WeekplanPastEntryPageModule {}
