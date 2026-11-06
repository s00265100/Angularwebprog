import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarService } from '../../services/car.service';
import { CarCard } from '../../components/car-card/car-card';
import { withLoadState } from '../../../../shared/load-state';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-car-list',
  imports: [CarCard, MatCardModule],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css'
})
export class CarList {

  private carService = inject(CarService);

  state = toSignal(
    withLoadState(this.carService.getCars()),
    { requireSync: true }
  );
}