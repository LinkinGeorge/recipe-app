import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { RecipesProvider } from '../recipes/recipes';
import { SettingsProvider } from '../settings/settings';
import { PlanEntry } from '../../models/plan-entry';

@Injectable()
export class LocalStorageProvider {
  public recipes = new Array();
  public plan = [];
  public list = [];
  cloudPlan = '';
  cloudList = '';

  baseUrl = 'http://georgs-recipes.herokuapp.com/';

  constructor(public storage: Storage, public api: RecipesProvider, public settings: SettingsProvider) {
      this.downloadPlan();
      this.downloadList();
  }

  // RECIPES

  getRecipes() {
    return this.storage.get('recipes');
  }

  getRecipe(recipeId: string) {
    return new Promise(
      resolve => {
        this.getRecipes().then((recipes) => {
          if (recipes) {
            let recipeArray = JSON.parse(recipes);
            const index = this.getById(recipeArray, recipeId);
            if (index !== -1) {
              let stored = recipeArray[index];
              resolve(stored);
            } else {
              console.log('Recipe not found');
            }
          }
        }
      )
    });
  }

  setRecipes(recipes) {
    return this.storage.set('recipes', JSON.stringify(recipes));
  }

  addRecipe(recipe) {
    return new Promise(
      resolve => {
        this.getRecipes().then((recipes) => {
          if (recipes) {
            this.recipes = JSON.parse(recipes);
          }
          this.recipes.push(recipe);
          this.storage.set('recipes', JSON.stringify(this.recipes)).then(() => {
            resolve(recipe);
          });
        })
      }
    );
  }

  updateRecipe(recipe) {
    return new Promise(
      resolve => {
        this.getRecipes().then((recipes) => {
          let recipeArray = JSON.parse(recipes);
          const index = this.getById(recipeArray, recipe._id);
          if (index !== -1) {
            recipeArray.splice(index, 1, recipe);
          }
          this.storage.set('recipes', JSON.stringify(recipeArray)).then(() => {
            resolve(recipe)
          });
        })
      }
    )
  }

  private getById(recipes: any[], recipeId: string):number {
    return recipes.findIndex((rec) => {
     return rec._id === recipeId;
    });
  }

  // SHOPPING LIST
  
  downloadList() {
    return new Promise(
      (resolve, reject) => {
        this.settings.getListCode().then(code => {
          if (code !== null) {
            this.cloudList = code;
            this.api.getList(this.cloudList).subscribe(res => {
              let newList = new Array();
              this.getOldList().then(oldList => {
                if (oldList !== null) {
                  this.getList().then(localList => {
                    newList = this.mergeLists(oldList, JSON.parse(localList), res.list);
                    this.storage.set('shopping-list', JSON.stringify(newList)).then(() => {
                      resolve();
                    });
                  });
                } else {
                  newList = res.list.slice(0);
                  this.storage.set('shopping-list', JSON.stringify(newList)).then(() => {
                    resolve();
                  });
                }
                this.storage.set('shopping-list', JSON.stringify(newList)).then(() => {
                  resolve();
                });
              });
            }, error => {
              reject();
            });
          } else {
            this.getList().then((list) => {
              if (list) {
                resolve();
              } else {
                this.storage.set('shopping-list', JSON.stringify([])).then(() => {
                  resolve();
                });
              }
            });
          }
        });
      }
    )
  }

  private mergeLists(oldList: string[], list1: string[], list2: string[]):string[] {
    let removed = oldList.slice();
    oldList.forEach(entry => {
      if (list1.indexOf(entry) !== -1 && list2.indexOf(entry) !== -1) {
        removed.splice(removed.indexOf(entry), 1);
      } else if (list1.indexOf(entry) === -1 && list2.indexOf(entry) === -1) {
        removed.splice(removed.indexOf(entry), 1);
      }
    });
    let mergedSet = new Set(list1.concat(list2));
    mergedSet.forEach(entry => {
      if (removed.indexOf(entry) !== -1) {
        mergedSet.delete(entry);
      }
    });
    this.api.updateList(this.cloudList, Array.from(mergedSet)).subscribe();
    return Array.from(mergedSet);
  }

  getList() {
    return this.storage.get('shopping-list');
  }

  addItem(item: string) {
    this.getList().then((list) => {
      if (list) {
        this.list = JSON.parse(list);
      } else {
        this.list = [];
      }
      this.list.push(item);
      this.storage.set('shopping-list', JSON.stringify(this.list)).then(() => {
        if (this.cloudList !== '') {
          this.api.updateList(this.cloudList, this.list).subscribe(cloudList => {}, error => {
            // set old list if no internet connection (if not refreshed before)
            this.setOldList(JSON.parse(list));
          });
        }
      });
    });
  }

  removeItem(item: string) {
    this.getList().then((list) => {
      this.list = JSON.parse(list);
      this.list.splice(this.list.indexOf(item), 1);
      this.storage.set('shopping-list', JSON.stringify(this.list)).then(() => {
        if (this.cloudList !== '') {
          this.api.updateList(this.cloudList, this.list).subscribe(cloudList => {}, error => {
            // set old list if no internet connection (if not refreshed before)
            this.setOldList(JSON.parse(list));
          });
        }
      });
    });
  }

  // WEEKPLAN

  downloadPlan() {
    return new Promise(
      (resolve, reject) => {
        this.settings.getPlanCode().then(code => {
          if (code !== null) {
            this.cloudPlan = code;
            this.api.getPlan(this.cloudPlan).subscribe(res => {
              let newPlan = new Array();
              newPlan = res.plan.slice(0);
              this.storage.set('plan', JSON.stringify(newPlan)).then(() => {
                resolve();
              });
            }, error => {
              reject();
            });
          } else {
            this.getPlan().then((plan) => {
              if (plan) {
                resolve();
              } else {
                this.storage.set('plan', JSON.stringify([])).then(() => {
                  resolve();
                });
              }
            });
          }
        });
      }
    )
  }

  getPlan() {
    return this.storage.get('plan');
  }

  addEntry(entry: PlanEntry) {
    return new Promise(
      resolve => {
        this.getPlan().then((plan => {
          if (plan) {
            this.plan = JSON.parse(plan);
            this.plan.push(entry);
            this.storage.set('plan', JSON.stringify(this.plan)).then(() => {
              if (this.cloudPlan === '') {
                resolve();
              } else {
                this.api.updatePlan(this.cloudPlan, this.plan).subscribe(() => {
                  resolve();
                });
              }
            });
          } else {
            this.plan = [];
            this.plan.push(entry);
            this.storage.set('plan', JSON.stringify(this.plan)).then(() => {
              resolve();
            });
          }
        }));
      }
    );
  }

  removeEntry(id: string) {
    return new Promise(
      resolve => {
        this.getPlan().then((plan => {
          this.plan = JSON.parse(plan);
          let delIndex = this.findEntryById(id);
          if (delIndex !== -1) {
            this.plan.splice(delIndex, 1);
          }
          this.storage.set('plan', JSON.stringify(this.plan)).then(() => {
            if (this.cloudPlan === '') {
              resolve();
            } else {
              this.api.updatePlan(this.cloudPlan, this.plan).subscribe(() => {
                resolve();
              });
            }
          });
        }));
      }
    );
  }

  updateEntry(id:string, time:string, servings:number) {
    return new Promise(
      resolve => {
        this.getPlan().then((plan => {
          this.plan = JSON.parse(plan);
          let index = this.findEntryById(id);
          if (index !== -1) {
            this.plan[index].time = time;
            this.plan[index].servings = servings;
          }
          this.storage.set('plan', JSON.stringify(this.plan)).then(() => {
            if (this.cloudPlan === '') {
              resolve();
            } else {
              this.api.updatePlan(this.cloudPlan, this.plan).subscribe(() => {
                resolve();
              });
            }
          });
        }));
      }
    );
  }

  /* OLD LIST VERSIONS TO SYNCHRONIZE PROPERLY */

  setOldList(list: string[]) {
    this.getOldList().then(oldList => {
      if (oldList === null) {
        console.log('setting list');
        console.log(list);
        this.storage.set('old-list', list);
      }
      console.log(oldList);
    });
  }

  getOldList() {
    return this.storage.get('old-list');
  }
  
  resetOldList() {
    return this.storage.remove('old-list');
  }
  

  private findEntryById(id: string):number {
    return this.plan.findIndex((entry) => {
      return entry._id === id;
    });
  }

}
