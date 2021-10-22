import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Trip } from '../../../../../core/domain/trip';

@Component({
  selector: 'trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.scss']
})
export class TripsTableComponent implements OnChanges, AfterViewInit {

  columns: string[] = ['id', 'departure', 'destination', 'startDate', 'endDate', 'totalSeats', 'freeSeats', 'detail'];

  source: MatTableDataSource<Trip> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() data: Trip[] = [];

  @Output() _new: EventEmitter<void> = new EventEmitter<void>();
  @Output() _edit: EventEmitter<number> = new EventEmitter<number>();

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Viajes por página';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Anterior';
    this.source.paginator = this.paginator;
    this.source.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.source.data = changes.data.currentValue;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.source.filter = filterValue.trim().toLowerCase();
    if (this.source.paginator) {
      this.source.paginator.firstPage();
    }
  }

  new() {
    this._new.emit();
  }

  detail(id: number) {
    this._edit.emit(id);
  }

}
