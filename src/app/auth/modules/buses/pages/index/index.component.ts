import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Bus } from '../../../../../core/domain/bus';
import { BusesService } from '../../services/buses.service';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  data: Bus[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private busesService: BusesService
  ) {}

  ngOnInit(): void {
    this.busesService.getAll().subscribe(
      buses => this.data = buses
    );
  }

  new() {
    this.router.navigate(['buses', 'new']).then();
  }

  edit(id: number) {
    this.router.navigate(['buses', 'detail', id]).then();
  }

  delete(id: number) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        ask: '¿Está seguro que desea eliminar el colectivo?'
      }
    }).afterClosed().subscribe(
      (confirm) => {
        if (confirm) {
          this.busesService.delete(id).subscribe(
            () => {
              this.data = this.data.filter(person => person.id !== id);
              this.snackBar.open('Se eliminó el colectivo con éxito.', 'OK', { duration: 2000 })
            },
            error => {
              this.snackBar.open(error, 'OK', { duration: 2000 })
            }
          )
        }
      }
    )
  }

}
