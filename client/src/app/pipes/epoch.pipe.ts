import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'epoch'
})
export class EpochPipe implements PipeTransform {

  transform(epoch: number): any {
    return new Date(epoch)
  }

}
