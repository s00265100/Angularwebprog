import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css',
})
export class CarForm {

  private fb = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.fb.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: [null as number | null]
  });

  onSubmit(): void {
    if (this.carForm.invalid) return;

    const newCar = {
  make: this.carForm.value.make ?? '',
  model: this.carForm.value.model ?? '',
  ...(this.carForm.value.year != null
    ? { year: this.carForm.value.year }
    : {})
};

    this.carService.addCar(newCar).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
}
