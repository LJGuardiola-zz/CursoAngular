import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../../../../../core/domain/person';
import { PersonService } from '../../services/persons.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})

export class DetailComponent implements OnInit {

  title: string = 'Detalle de una persona';

  person!: Person;

  loading: boolean = false;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.personService
          .get(parseInt(id))
          .subscribe(
            person => {
              this.person = person
              this.loading = false;
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
    this.router.navigate(['persons']).then();
  }

  submit(person: any) {
    this.loading = true;
    this.personService.update(person).subscribe(
      () => {
        this.snackBar.open('La persona se actualizó con éxito', 'OK', { duration: 2000 });
        this.back();
      },
      error => {
        this.snackBar.open(error, 'Error', { duration: 2000 });
        this.loading = false;
      }
    )
  }

}
