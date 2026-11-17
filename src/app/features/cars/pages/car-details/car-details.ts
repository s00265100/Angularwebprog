
import { Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-car-details',
  imports: [MatCardModule, RouterLink, MatButtonModule],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css'
})
export class CarDetails {

  private readonly router = inject(Router);
  private carService = inject(CarService);

  readonly id = input.required<string>();

  readonly initial: LoadState<Car> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        withLoadState(this.carService.getCarById(id))
      )
    ),
    { initialValue: this.initial }
  );

  deleting = signal(false);
  deleteError = signal<string | null>(null);

  deleteCar(car: Car): void {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.carService.deleteCar(car._id!).subscribe({
      next: () => {
        this.deleting.set(false);
        this.router.navigate(['/cars']);
      },
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      }
    });
  }
}
