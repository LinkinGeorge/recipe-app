import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsProvider {

  constructor(public storage: Storage) { }

  setPlanCode(name:string) {
    return this.storage.set('plan-code', name);
  }

  getPlanCode() {
    return this.storage.get('plan-code');
  }

  setListCode(name:string) {
    return this.storage.set('list-code', name);
  }

  getListCode() {
    return this.storage.get('list-code');
  }

}
