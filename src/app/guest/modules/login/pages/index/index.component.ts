import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {

  loading: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ) {}

  submit(credentials: any) {
    this.loading = true;
    this.auth.login(
      credentials.username,
      credentials.password
    ).subscribe(
      () => {
        this.router.navigate(['/']).then();
      },
      (error) => {
        this.snackbar.open(error, 'OK');
        this.loading = false;
      }
    )
  }
}
