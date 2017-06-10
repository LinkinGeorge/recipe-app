import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday',
})
export class WeekdayPipe implements PipeTransform {

  transform(date: Date):string {
    const toCheck = new Date(date).setHours(12,0,0,0);
    const today = new Date(Date.now()).setHours(12,0,0,0);
    const tomorrow = this.addDays(new Date(today), 1).getTime();
    const thisWeek = new Array<number>(7);
    for (var i = 0; i < thisWeek.length; i++) {
      thisWeek[i] = this.addDays(new Date(Date.now()), i).getTime();
    }
    if (toCheck == today) {
      return 'Heute'
    } else if (toCheck== tomorrow) {
      return 'Morgen'
    } else if (thisWeek.indexOf(new Date(toCheck).getTime()) !== -1) {
      return this.getWeekdayString(new Date(toCheck).getDay());
    } else {
      return this.getWeekdayString(new Date(toCheck).getDay()) + ' (' + new Date(toCheck).toLocaleDateString() + ')';
    }
    
  }
  private getWeekdayString(day):string {
    switch (day) {
      case 0:
        return 'Sonntag'
      case 1:
        return 'Montag'
      case 2:
        return 'Dienstag'
      case 3:
        return 'Mittwoch'
      case 4:
        return 'Donnerstag'
      case 5:
        return 'Freitag'
      case 6:
        return 'Samstag'
    
      default:
        return 'Keine Ahnung'
    }
  }
  
  private addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return new Date(date.setHours(12,0,0,0));
  }
}
