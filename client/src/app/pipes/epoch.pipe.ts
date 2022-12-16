import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epoch'
})
// pipe to convert epoch milliseconds to date time
export class EpochPipe implements PipeTransform {

  transform(epoch: number): any {
    return new Date(epoch)
  }

}
