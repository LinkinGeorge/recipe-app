import { CalcServingsPipe } from './calc-servings';
import { DifficultyStringPipe } from './difficulty-string';
import { FilterRecipesPipe } from './filter-recipes';
import { NoVeggiesPipe } from './no-veggies';
import { RoundPipe } from './round';
import { SortRecipesPipe } from './sort-recipes';
import { ThumbnailPipe } from './thumbnail';
import { WeekdayPipe } from './weekday';
import { NgModule } from '@angular/core';
 
@NgModule({
    declarations: [
        CalcServingsPipe,
        DifficultyStringPipe,
        FilterRecipesPipe,
        NoVeggiesPipe,
        RoundPipe,
        SortRecipesPipe,
        ThumbnailPipe,
        WeekdayPipe
    ],
    imports: [
 
    ],
    exports: [
        CalcServingsPipe,
        DifficultyStringPipe,
        FilterRecipesPipe,
        NoVeggiesPipe,
        RoundPipe,
        SortRecipesPipe,
        ThumbnailPipe,
        WeekdayPipe
    ]
})
export class PipesModule {}