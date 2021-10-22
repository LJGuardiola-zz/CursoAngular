import { Pipe, PipeTransform } from '@angular/core';
import { DateService } from '../../core/services/date.service';

@Pipe({
  name: 'unixDateShow'
})
export class UnixDateShowPipe implements PipeTransform {

  constructor(
    private dateService: DateService
  ) {}

  transform(unixTime: number): unknown {
    return this.dateService.convertUnixTime(unixTime);
  }

}
