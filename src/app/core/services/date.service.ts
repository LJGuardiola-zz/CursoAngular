import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DateService {

  /**
   *  Formateo de fechas para compatibilidad
   *  con input de tipo datetime-local / unix time
   *  e impresión en español
   */

  toUnix(input: string): number {
    return (new Date(input).getTime() / 1000) - this.getTimezoneOffset();
  }

  forInput(unix: number): string {
    const date = new Date(((unix - this.getTimezoneOffset()) * 1000)).toISOString();
    return date.substring(0, date.length - 1);
  }

  convertUnixTime(unix: number) {
    const months = [
      'Enero', 'Febrero', 'Mayo', 'Abril', 'Mayo', 'Junio', 'Julio',
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const a = new Date(unix * 1000),
      year = a.getFullYear(),
      month = months[a.getMonth()],
      date = a.getDate(),
      hour = a.getHours(),
      min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
      sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    return `${ date } de ${ month } del ${ year }, ${ hour }:${ min }:${ sec }`;
  }

  getTimezoneOffset(): number {
    return new Date().getTimezoneOffset() * 60;
  }

}
