export class PlanEntry {
    constructor(
        public recipe: {
            id: string,
            title: string
        },
        public date: Date,
        public custom: string,
        public time: string,
        public servings: number,
        public _id?: string
    ) {  }
}