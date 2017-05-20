import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayFilter',
})
export class DayFilterPipe implements PipeTransform {

  transform(entries: any[], day: Date):any[] {
    let filtered = [];
    entries.forEach(entry => {
      if (new Date(entry.date).getDate() === new Date(this.addDays(new Date(Date.now()), day.getDay())).getDate()) {
        filtered.push(entry);
      }
    })
    return filtered;
  }

  private addDays(date: Date, days: number): Date {
    const newDate = new Date();
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
}
