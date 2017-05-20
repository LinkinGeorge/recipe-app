import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeMenuPage } from './home-menu';

@NgModule({
  declarations: [
    HomeMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeMenuPage),
  ],
  exports: [
    HomeMenuPage
  ]
})
export class HomeMenuPageModule {}
