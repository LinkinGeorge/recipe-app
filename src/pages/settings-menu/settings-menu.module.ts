import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsMenuPage } from './settings-menu';

@NgModule({
  declarations: [
    SettingsMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsMenuPage),
  ],
  exports: [
    SettingsMenuPage
  ]
})
export class SettingsMenuPageModule {}
