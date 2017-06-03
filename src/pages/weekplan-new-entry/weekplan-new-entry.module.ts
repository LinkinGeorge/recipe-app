import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';
import { WeekplanNewEntryPage } from './weekplan-new-entry';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    WeekplanNewEntryPage
  ],
  imports: [
    IonicPageModule.forChild(WeekplanNewEntryPage),
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    WeekplanNewEntryPage
  ]
})
export class WeekplanNewEntryPageModule {}
