import { Component,input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../models/car.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-car-card',
  imports: [RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard 
{car = input.required<Car>();}
