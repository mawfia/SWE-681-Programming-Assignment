import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'realtime',
    pure: false
})
export class Realtime implements PipeTransform {
    transform(diff: number): String {
      let realtime: String = "";

      const days: number = Math.floor(diff /(24*60*60*1000));
      realtime += days > 0 ? `${days}`.padStart(2, '0') : "00";

      const daysms: number = diff % (24*60*60*1000);

      const hours: number = Math.floor(daysms/(60*60*1000));
      realtime += hours > 0 ? ":"+`${hours}`.padStart(2, '0') : ":00";
      const hoursms = diff % (60*60*1000);

      const minutes: number = Math.floor(hoursms/(60*1000));
      realtime += minutes > 0 ? ":"+`${minutes}`.padStart(2, '0') : ":00";
      const minutesms: number = diff % (60*1000);

      const seconds: number = Math.floor((minutesms)/(1000));
      realtime += seconds > 0 ? ":"+`${seconds}`.padStart(2, '0') : ":00";

      return realtime;
    }
}
