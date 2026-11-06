import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css'
})
export class CarForm {

  private fb = inject(FormBuilder);

  carForm = this.fb.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [null as number | null]
  });

}