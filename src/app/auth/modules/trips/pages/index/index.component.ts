import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TripsService } from '../../services/trips.service';
import { Trip } from '../../../../../core/domain/trip';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {

  data: Trip[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private tripsService: TripsService
  ) {}

  ngOnInit(): void {
    this.tripsService.getAll().subscribe(
      trips => this.data = trips
    );
  }

  new() {
    this.router.navigate(['trips', 'new']).then();
  }

  edit(id: number) {
    this.router.navigate(['trips', 'detail', id]).then();
  }

}
