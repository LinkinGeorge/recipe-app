import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekday',
})
export class WeekdayPipe implements PipeTransform {

  transform(date: Date):string {
    const toCheck = new Date(date);
    if (toCheck.getDay() === new Date(Date.now()).getDay()) {
      return 'Heute'
    }
    if (toCheck.getDay() === new Date(Date.now()).getDay() + 1) {
      return 'Morgen'
    }
    switch (toCheck.getDay()) {
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
}
