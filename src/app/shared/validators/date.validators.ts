import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DateValidators {

  static future(control: AbstractControl): ValidationErrors | null {
    const now = new Date().getTime() / 1000;
    const date = new Date(control.value).getTime() / 1000;
    if (date < now) {
      return { future: true }
    }
    return null;
  }

  static checkStartEndDate(startControl: string, endControl: string) {
    return (control: AbstractControl): ValidationErrors | null => {

      const start = new Date(
        control.get(startControl)?.value
      ).getTime() / 1000;

      const end = new Date(
        control.get(endControl)?.value
      ).getTime() / 1000;

      if (start > end) {
        return { checkStartEnd: true }
      }
      return null;
    }
  }

}
