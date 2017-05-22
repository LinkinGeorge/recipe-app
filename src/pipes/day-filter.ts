import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayFilter',
})
export class DayFilterPipe implements PipeTransform {

  transform(entries: any[], day: Date):any[] {
    let filtered = [];
    entries.forEach(entry => {
      if (new Date(entry.date).getDate() === new Date(day).getDate()) {
        filtered.push(entry);
      }
    })
    return filtered;
  }
}
