import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bus } from '../../../../../core/domain/bus';
import { Trip } from '../../../../../core/domain/trip';
import { BusesService } from '../../../buses/services/buses.service';
import { Person } from '../../../../../core/domain/person';
import { PersonService } from '../../../persons/services/persons.service';
import { DateValidators } from '../../../../../shared/validators/date.validators';
import { TripValidator } from '../../../../../shared/validators/trip.validator';
import { DateService } from '../../../../../core/services/date.service';

@Component({
  selector: 'trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnChanges {

  form: FormGroup;

  buses: Bus[] = [];
  passengers: Person[] = [];

  @Input() trip: Trip | null = null;
  @Input() title: string = 'Agregar viaje';
  @Input() loading: boolean = false;

  @Output() _cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() _submit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private busesService: BusesService,
    private dateService: DateService,
    private personService: PersonService,
  ) {
    this.form = this.formBuilder.group({
      id: [
        null
      ],
      departure: [
        null, [Validators.required]
      ],
      destination: [
        null, [Validators.required]
      ],
      startDate: [
        null, [Validators.required, DateValidators.future]
      ],
      endDate: [
        null, [Validators.required, DateValidators.future]
      ],
      bus: [
        null, [Validators.required]
      ],
      passengers: [
        null, [Validators.required]
      ]
    }, {
      validators: [
        DateValidators.checkStartEndDate('startDate', 'endDate'),
        TripValidator.maxPassengers('bus', 'passengers')
      ]
    });
    this.loadSelectBuses();
    this.loadSelectPassengers();
  }

  get controls() {
    return this.form.controls;
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm(changes.trip?.currentValue);
  }

  buildForm(trip: Trip | null) {
    if (trip != null) {
      this.form.patchValue({
        id: trip.id,
        departure: trip.departure,
        destination: trip.destination,
        startDate: this.dateService.forInput(trip.startDate),
        endDate: this.dateService.forInput(trip.endDate),
        bus: trip.bus,
        passengers: trip.passengers
      });
    }
  }

  compare(o1: Bus | Person, o2: Bus | Person): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  cancel() {
    this._cancel.emit();
  }

  submit() {
    const data = {
      'id': this.controls.id.value,
      'departure': this.controls.departure.value,
      'destination': this.controls.destination.value,
      'bus': {
        'id': this.controls.bus.value.id,
        'licensePlate': this.controls.bus.value.licensePlate,
        'model': {
          'id': this.controls.bus.value.model.id,
          'name': this.controls.bus.value.model.name,
          'brand': {
            'id': this.controls.bus.value.model.brand.id,
            'name': this.controls.bus.value.model.brand.name,
            'models': []
          }
        },
        'numberOfSeats': this.controls.bus.value.numberOfSeats
      },
      'passengers': this.controls.passengers.value,
      'startDate': this.dateService.toUnix(this.controls.startDate.value),
      'endDate': this.dateService.toUnix(this.controls.endDate.value),
    }
    this._submit.emit(data);
  }

  private loadSelectBuses() {
    this.loading = true;
    this.busesService.getAll().subscribe(buses => {
      this.buses = buses;
      this.loading = false;
    });
  }

  private loadSelectPassengers() {
    this.loading = true;
    this.personService.getAll().subscribe(persons => {
      this.passengers = persons;
      this.loading = false;
    });
  }

}
