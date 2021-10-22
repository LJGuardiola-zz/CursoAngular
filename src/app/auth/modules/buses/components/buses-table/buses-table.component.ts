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

import { Bus } from '../../../../../core/domain/bus';

@Component({
  selector: 'buses-table',
  templateUrl: './buses-table.component.html',
  styleUrls: ['./buses-table.component.scss']
})

export class BusesTableComponent implements OnChanges, AfterViewInit {

  columns: string[] = ['id', 'licensePlate', 'brand', 'model', 'numberOfSeats', 'detail', 'delete'];

  source: MatTableDataSource<Bus> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() data: Bus[] = [];

  @Output() _new: EventEmitter<void> = new EventEmitter<void>();
  @Output() _edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() _delete: EventEmitter<number> = new EventEmitter<number>();

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Colectivos por página';
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

  delete(id: number) {
    this._delete.emit(id);
  }

}
