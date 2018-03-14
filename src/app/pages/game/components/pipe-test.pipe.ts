import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeTest'
})
export class PipeTestPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
