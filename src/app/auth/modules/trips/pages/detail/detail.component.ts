import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Trip } from '../../../../../core/domain/trip';
import { TripsService } from '../../services/trips.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  title: string = 'Detalle de un viaje';

  trip!: Trip;

  loading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private tripsService: TripsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.tripsService
          .get(parseInt(id))
          .subscribe(
            trip => {
              this.trip = trip
            },
            error => {
              this.snackBar.open(error, 'Ok', { duration: 2000 });
              this.back();
            }
          )
      }
    })
  }

  back() {
    this.router.navigate(['trips']).then();
  }

  submit(trip: any) {
    this.loading = true;
    this.tripsService.update(trip).subscribe(
      () => {
        this.snackBar.open('El viaje se actualizó con éxito', 'OK', { duration: 2000 });
        this.back();
      },
      error => {
        this.snackBar.open(error, 'Error', { duration: 2000 });
        this.loading = false;
      }
    )
  }

}
