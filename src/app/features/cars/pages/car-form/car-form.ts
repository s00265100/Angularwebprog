import { Component, inject,signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import {Car, CreateCarDto } from '../../models/car.model';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css',
})
export class CarForm {
  saving = signal(false);
  saveError = signal<string | null>(null);
  private fb = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.fb.nonNullable.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: this.fb.control<number | null>(null)
  });

  onSubmit(): void {
  if (this.carForm.invalid) return;

  const { make, model, year } = this.carForm.getRawValue();
  const newCar: CreateCarDto = {
    make,
    model,
    year: year ?? undefined
  };

  this.saving.set(true);
  this.saveError.set(null);

  this.carService.addCar(newCar).subscribe({
    next: (response) => {
      console.log('Car added successfully:', response);
      this.router.navigate(['/cars']);
    },
    error: (err: Error) => {
      this.saveError.set(err.message);
      this.saving.set(false);
    }
  });
}
}