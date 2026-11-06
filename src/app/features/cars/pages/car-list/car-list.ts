import { Component,OnInit,inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CarCard } from '../../components/car-card/car-card';

@Component({
  selector: 'app-car-list',
  imports: [AsyncPipe,CarCard],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css',
})
export class CarList implements OnInit {
  //inject(CarService) give the component access to our service.
  private carService = inject(CarService);
//cars$ store the Observable containing the car list.
  cars$!: Observable<Car[]>;
//ngOnInit()  runs when Angular initialises the component
  ngOnInit(): void {
    //getCars()  gett the Observable from the service.
    this.cars$ = this.carService.getCars();
  }
}
