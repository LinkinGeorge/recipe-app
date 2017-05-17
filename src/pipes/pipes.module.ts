import { CalcServingsPipe } from './calc-servings';
import { DifficultyStringPipe } from './difficulty-string';
import { FilterRecipesPipe } from './filter-recipes';
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
        RoundPipe,
        SortRecipesPipe,
        ThumbnailPipe,
        WeekdayPipe
    ]
})
export class PipesModule {}