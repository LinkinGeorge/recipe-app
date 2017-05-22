import { Recipe } from './recipe';

export class PlanEntry {
    constructor(
        public recipe: Recipe,
        public date: Date,
        public custom: string,
        public _id?: string
    ) {  }
}