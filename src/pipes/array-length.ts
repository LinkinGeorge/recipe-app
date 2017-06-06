import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length',
})
export class ArrayLengthPipe implements PipeTransform {

  transform(array: any[]): number {
    return array.length;
  }
}
