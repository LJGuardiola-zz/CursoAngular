import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '../../../../../core/domain/person';

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnChanges {

  form: FormGroup;

  @Input() person: Person | null = null;
  @Input() title: string = 'Agregar persona';
  @Input() loading: boolean = false;

  @Output() _cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() _submit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [
        null
      ],
      firstName: [
        null, Validators.required
      ],
      lastName: [
        null, Validators.required
      ],
      age: [
        null, Validators.required
      ],
    });
  }

  get controls() {
    return this.form.controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm(changes.person?.currentValue);
  }

  buildForm(person: Person | null) {
    if (person != null) {
      this.form.patchValue({
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        age: person.age
      });
    }
  }

  cancel() {
    this._cancel.emit();
  }

  submit() {
    this._submit.emit(
      this.form.value
    );
  }

}
