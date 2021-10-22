import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bus } from '../../../../../core/domain/bus';
import { BusesService } from '../../services/buses.service';
import { Brand } from '../../../../../core/domain/brand';
import { Model } from '../../../../../core/domain/model';

@Component({
  selector: 'bus-form',
  templateUrl: './bus-form.component.html',
  styleUrls: ['./bus-form.component.scss']
})

export class BusFormComponent implements OnChanges {

  form: FormGroup;

  brands: Brand[] = [];
  models: Model[] = [];

  @Input() bus: Bus | null = null;
  @Input() title: string = 'Agregar colectivo';
  @Input() loading: boolean = false;

  @Output() _cancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() _submit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private busesService: BusesService
  ) {
    this.form = this.formBuilder.group({
      id: [
        null
      ],
      licensePlate: [
        null, [Validators.required]
      ],
      brand: [
        null, [Validators.required]
      ],
      model: [
        null, [Validators.required]
      ],
      numberOfSeats: [
        null, [Validators.required]
      ]
    });
    this.loadSelectBrands();
  }

  get controls() {
    return this.form.controls;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.buildForm(changes.bus?.currentValue);
  }

  buildForm(bus: Bus | null) {
    if (bus != null) {
      this.form.patchValue({
        id: bus.id,
        model: bus.model,
        brand: bus.model.brand,
        licensePlate: bus.licensePlate,
        numberOfSeats: bus.numberOfSeats
      });
    }
  }

  compare(o1: Model | Brand, o2: Model | Brand): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  cancel() {
    this._cancel.emit();
  }

  submit() {
    const data = {
      'id': this.controls.id.value,
      'licensePlate': this.controls.licensePlate.value,
      'model': {
        'id': this.controls.model.value.id,
        'name': this.controls.model.value.name,
        'brand': {
          'id': this.controls.brand.value.id,
          'name': this.controls.brand.value.name,
          'models': []
        }
      },
      'numberOfSeats': this.controls.numberOfSeats.value
    }
    this._submit.emit(data);
  }

  private loadSelectBrands() {
    this.loading = true;
    this.busesService.getBrands().subscribe(brands => {
      this.brands = brands;
      this.loading = false;
    });
    this.form.controls.brand.valueChanges.subscribe(
      selected => this.loadSelectModels(selected)
    );
  }

  private loadSelectModels(selected: any) {
    this.loading = true;
    this.busesService.getModels(selected.id)
      .subscribe(models => {
        this.models = models;
        this.loading = false;
      });
  }

}
