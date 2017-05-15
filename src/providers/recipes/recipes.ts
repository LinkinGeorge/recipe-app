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

}
