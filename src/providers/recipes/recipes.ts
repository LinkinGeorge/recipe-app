import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RecipesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
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

}
