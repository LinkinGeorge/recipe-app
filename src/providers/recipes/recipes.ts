import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesProvider {
  baseUrl = 'http://georgs-recipes.herokuapp.com/';

  constructor(public http: Http) { }

  getAllRecipes() {
    return this.http.get(this.baseUrl + 'api/recipes')
      .map(res => res.json());
  }

  getRecipe(recipeId) {
    return this.http.get(this.baseUrl + 'api/recipe/' + recipeId)
      .map(res => res.json());
  }

  updateRecipe(recipe) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUrl + 'api/recipe/' + recipe._id, JSON.stringify(recipe), {headers: headers})
      .map(res => res.json());
  }

  newRecipe(recipe) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + 'api/recipe', JSON.stringify(recipe), {headers: headers})
      .map(res => res.json());
  }

  /* PLANS */

  getPlan(name:string) {
    return this.http.get(this.baseUrl + 'api/plan/' + name)
      .map(res => res.json());
  }

  newPlan(name:string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var plan = {name: name, plan: []};
    return this.http.post(this.baseUrl + 'api/plans', JSON.stringify(plan), {headers: headers})
      .map(res => res.json());
  }

  updatePlan(name, plan) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var newPlan = {name:name, plan:plan};
    return this.http.put(this.baseUrl + 'api/plan/' + name, JSON.stringify(newPlan), {headers: headers})
      .map(res => res.json());
  }

  /* LISTS */

  getList(name:string) {
    return this.http.get(this.baseUrl + 'api/list/' + name)
      .map(res => res.json());
  }

  newList(name:string) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var list = {name: name, list: []};
    return this.http.post(this.baseUrl + 'api/lists', JSON.stringify(list), {headers: headers})
      .map(res => res.json());
  }

  updateList(name:string, list) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var newList = {name: name, list: list};
    return this.http.put(this.baseUrl + 'api/list/' + name, JSON.stringify(newList), {headers: headers})
      .map(res => res.json());
  }

}
