import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {

  form: FormGroup;

  @Input() loading: boolean = false;

  @Output() _submit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      username: [
        null, [Validators.required, Validators.email]
      ],
      password: [
        null, [Validators.required]
      ]
    })
  }

  get controls() {
    return this.form.controls;
  }

  submit() {
    this._submit.emit(
      this.form.value
    );
  }

}
