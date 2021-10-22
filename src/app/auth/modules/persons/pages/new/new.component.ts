import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonService } from '../../services/persons.service';

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
    private personService: PersonService
  ) {}

  back() {
    this.router.navigate(['persons']).then();
  }

  submit(person: any) {
    this.loading = true;
    this.personService.create(person)
      .subscribe(
        () => {
          this.snackBar.open('La persona se creó con éxito', 'OK', { duration: 2000 });
          this.back();
        },
        error => {
          this.snackBar.open(error, 'OK', { duration: 2000 });
          this.loading = false;
        }
      )
  }

}
