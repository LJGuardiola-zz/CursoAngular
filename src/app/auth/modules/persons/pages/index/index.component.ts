import { Component, OnInit } from '@angular/core';
import { Person } from '../../../../../core/domain/person';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PersonService } from '../../services/persons.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  data: Person[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.personService.getAll().subscribe(
      persons => this.data = persons
    );
  }

  new() {
    this.router.navigate(['persons', 'new']).then();
  }

  edit(id: number) {
    this.router.navigate(['persons', 'detail', id]).then();
  }

  delete(id: number) {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        ask: '¿Está seguro que desea eliminar la persona?'
      }
    }).afterClosed().subscribe(
      (confirm) => {
        if (confirm) {
          this.personService.delete(id).subscribe(
            () => {
              this.data = this.data.filter(person => person.id !== id);
              this.snackBar.open('Se eliminó la persona con éxito.', 'OK', { duration: 2000 })
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
