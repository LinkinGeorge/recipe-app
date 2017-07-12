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

  resetPlanCode() {
    return this.storage.remove('plan-code');
  }

  setListCode(name:string) {
    return this.storage.set('list-code', name);
  }

  getListCode() {
    return this.storage.get('list-code');
  }
  
  resetListCode() {
    return this.storage.remove('list-code');
  }

  setDefaultTime(time:string) {
    return this.storage.set('default-time', time);
  }

  getDefaultTime() {
    return this.storage.get('default-time');
  }

  setDefaultServings(servings: number) {
    return this.storage.set('default-servings', servings);
  }

  getDefaultServings() {
    return this.storage.get('default-servings');
  }

  setLowDataMode(lowData: boolean) {
    return this.storage.set('low-data', lowData);
  }

  lowDataMode() {
    const mode = this.storage.get('low-data');
    if (mode) {
      return mode;
    }
    return new Promise(
      resolve => {
        resolve(false);
      }
    );
  }

}
