import { Component, inject,signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { CarService } from '../../services/car.service';
import {Car, CreateCarDto } from '../../models/car.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-form',
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './car-form.html',
  styleUrl: './car-form.css',
})
export class CarForm {
  saving = signal(false);
  saveError = signal<string | null>(null);
  private fb = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  readonly currentYear = new Date().getFullYear();

carForm = this.fb.nonNullable.group({
  make: ['', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30)
  ]],
  model: ['', [
    Validators.required,
    Validators.maxLength(30)
  ]],
  year: this.fb.control<number | null>(null, [
    Validators.min(1950),
    Validators.max(this.currentYear + 1)
  ])
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
        this.snackBar.open(`${newCar.make} ${newCar.model} saved`, 'Close', { duration: 10000 });
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
