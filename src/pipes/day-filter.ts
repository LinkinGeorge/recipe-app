import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayFilter',
})
export class DayFilterPipe implements PipeTransform {

  transform(entries: any[], date: Date):any[] {
    let filtered = [];
    entries.forEach(entry => {
      const paramDate = new Date(date).setHours(0,0,0,0);
      const entryDate = new Date(entry.date).setHours(0,0,0,0);
      if (new Date(paramDate).getTime() === new Date(entryDate).getTime()) {
        filtered.push(entry);
      }
    })
    return filtered;
  }
}
