import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortRecipes',
})
export class SortRecipesPipe implements PipeTransform {

  transform(recipes: any[], sortby: string, desc: boolean, weekplan?: any[]): any[] {
    switch (sortby) {
      case 'last-cooked':
        recipes = sortByLastCooked();
        break;

      case 'duration':
        recipes.sort(function(a, b) {
          return a.duration - b.duration;
        });
        break;

      case 'difficulty':
        recipes.sort(function(a, b) {
          return a.difficulty - b.difficulty;
        });
        break;

      case 'ingredient-count':
        recipes.sort(function(a, b) {
          return a.ingredients.length - b.ingredients.length;
        });
        break;

      case 'date':
        recipes.sort(function (a, b) {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
        break;

      default:
        break;
    }
    if (desc) {
      recipes.reverse();
    }
    return recipes;
    
    function sortByLastCooked() {
      let recipesCopy = recipes.slice(0);
        let cooked = []; // recipes the user has already cooked
        if (!weekplan) {
          weekplan = [];
        } else {
          // sort weekplan by date, ascending
          weekplan = weekplan.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          let ids = []; // ids of cooked recipes
          let trimmedWeekplan = weekplan.slice(0); // eliminate duplicate recipes
          weekplan.forEach(entry => {
            if (!entry.recipe) {
              trimmedWeekplan.splice(trimmedWeekplan.indexOf(entry), 1);
            }
            else if (ids.indexOf(entry.recipe.id) !== -1) {
              // recipe has already been cooked at an earlier date
              trimmedWeekplan.splice(trimmedWeekplan.indexOf(entry), 1);
            } else {
              ids.push(entry.recipe.id);
            }
          });
          weekplan = trimmedWeekplan.slice(0);
        }
        // get an array of recipes that have not been cooked yet
        weekplan.forEach(entry => {
          if (entry.recipe) {
            const index = findById(recipesCopy, entry.recipe.id);
            recipesCopy.splice(index, 1);
          }
        });
        // get recipe for each weekplan entry (already trimmed and sorted by date)
        cooked = weekplan.map(entry => {
          return recipes[findById(recipes, entry.recipe.id)];
        }).reverse(); // reverse because most recent recipes should be the least ones
        let cookedCopy = cooked.slice();
        // delete all recipes from cooked ones that aren't in the provided recipes array which has been filtered with filterRecipes
        cooked.forEach(recipe => {
          if (recipes.indexOf(recipe) === -1) {
            cookedCopy.splice(cookedCopy.indexOf(recipe), 1);
          }
        });
        // concatenate not-cooked and cooked recipes, reverse because asc/desc is reverted here
        return recipes = recipesCopy.concat(cookedCopy).reverse();
    }

    function findById(recipeArray:any[], id:string):number {
      return recipeArray.findIndex(recipe => {
        return recipe._id === id;
      });
    }

  }

  
}
