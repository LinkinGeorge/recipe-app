import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Deploy } from '@ionic/cloud-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  listPage:any = ShoppingListPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public deploy: Deploy) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ionViewDidLoad(){
    this.deploy.check().then((snapshotAvailable: boolean) => {
      if (snapshotAvailable) {
        this.deploy.download().then(() => {
          return this.deploy.extract().then(() => {
            this.deploy.load();
          });
        });
      }
    });
  }
}

