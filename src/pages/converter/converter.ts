import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-converter',
  templateUrl: 'converter.html',
})
export class ConverterPage {
  quantity = 0;

  constructor(public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
