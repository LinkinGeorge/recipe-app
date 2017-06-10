import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filterRecipes'
})
@Injectable()
export class FilterRecipesPipe implements PipeTransform {

  transform(recipes: any[], query: string, favorites?: string[]): any[] {

    let favFiltered = new Array();
    if (favorites) {
      favFiltered = filterFavorites(recipes, favorites);
    } else {
      favFiltered = recipes.slice();
    }
    return filter(favFiltered, query);

    function filterFavorites(toFilter: any[], favs: string[]): any[] {
      let filtered = new Array();
      toFilter.forEach(recipe => {
        if (favs.indexOf(recipe._id) !== -1) {
          filtered.push(recipe);
        }
      });
      return filtered;
    }

    function filter(toFilter: any[], queryIn: string): any[] {
      let queryArray = new Array<string>();
      if (queryIn === '') {
        return toFilter;
      } else {
        queryArray = queryIn.split(',');
      }
      let filtered = new Array();
      toFilter.forEach(recipe => {
        let queryArrayTmp = queryArray.slice(0);
        queryArray.forEach(query => {
          let hasIngredient = false;
          recipe.ingredients.forEach(ingredient => {
            if (ingredient.name.trim().toLowerCase().includes(query.trim().toLowerCase())) {
              hasIngredient = true;
            }
          });
          let hasCategory = false;
          recipe.categories.forEach(category => {
            if (category.trim().toLowerCase().includes(query.trim().toLowerCase())) {
              hasCategory = true;
            }
          });
          if (recipe.title.trim().toLowerCase().includes(query.trim().toLowerCase()) || hasIngredient || hasCategory) {
            queryArrayTmp.splice(queryArrayTmp.indexOf(query), 1);
          }
          else if (query === '') {
            queryArrayTmp.splice(queryArrayTmp.indexOf(''), 1);
          } else if (query === ' ') {
            queryArrayTmp.splice(queryArrayTmp.indexOf(' '), 1);
          }
        });
        if (queryArrayTmp.length === 0) {
          filtered.push(recipe);
        }
      });
      return filtered;
    }
  }
}
