import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Bus } from '../../../../../core/domain/bus';
import { BusesService } from '../../services/buses.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  title: string = 'Detalle de un colectivo';

  bus!: Bus;
  loading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private busService: BusesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.busService
          .get(parseInt(id))
          .subscribe(
            bus => {
              this.bus = bus
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
    this.router.navigate(['buses']).then();
  }

  submit(bus: any) {
    this.loading = true;
    this.busService.update(bus).subscribe(
      () => {
        this.snackBar.open('El colectivo se actualizó con éxito', 'OK', { duration: 2000 });
        this.back();
      },
      error => {
        this.snackBar.open(error, 'Error', { duration: 2000 });
        this.loading = false;
      }
    )
  }

}
