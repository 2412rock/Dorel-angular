import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateServiciuName',
})
export class TruncateServiciuNamePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 10) {
      return value.slice(0, 10) + '...';
    }
    return value;
  }
}
