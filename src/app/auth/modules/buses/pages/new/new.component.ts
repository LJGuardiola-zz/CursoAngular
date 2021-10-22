import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusesService } from '../../services/buses.service';

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
    private busesService: BusesService
  ) {}

  back() {
    this.router.navigate(['buses']).then();
  }

  submit(bus: any) {
    this.loading = true;
    this.busesService.create(bus)
      .subscribe(
        () => {
          this.snackBar.open('El colectivo se creó con éxito', 'OK', { duration: 2000 });
          this.back();
        },
        error => {
          this.snackBar.open(error, 'OK', { duration: 2000 });
          this.loading = false;
        }
      )
  }

}
