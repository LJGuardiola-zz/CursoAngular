import { AbstractControl, ValidationErrors } from '@angular/forms';

export class TripValidator {

  static maxPassengers(busControl: string, passengersControl: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const max = control.get(busControl)?.value?.numberOfSeats;
      const size = control.get(passengersControl)?.value?.length;
      if (size > max) {
        return { maxPassengers: true }
      }
      return null;
    }
  }

}
