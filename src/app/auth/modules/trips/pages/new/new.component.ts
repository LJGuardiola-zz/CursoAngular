import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})

export class NewComponent {

  loading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private tripsService: TripsService
  ) {}

  back() {
    this.router.navigate(['trips']).then();
  }

  submit(trip: any) {
    this.loading = true;
    this.tripsService.create(trip)
      .subscribe(
        () => {
          this.snackBar.open('El viaje se creó con éxito', 'OK', { duration: 2000 });
          this.back();
        },
        error => {
          this.snackBar.open(error, 'OK', { duration: 2000 });
          this.loading = false;
        }
      )
  }

}
