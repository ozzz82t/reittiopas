import { Injectable } from "@angular/core";
import { RouteCalculator } from "./routeCalculator";
import { BusStop } from './busStop';
import { stopFactory, getLinesBetweenStops } from './roadBuilder';
import { Subject, Observable } from 'rxjs';

export interface RouteData {
  stops: BusStop[];
  time: number;
}


@Injectable({
  providedIn: "root"
})
export class RoutefinderService {

  private routeCalculator: RouteCalculator;
  private route = new Subject<RouteData>();


  constructor() {
    const stops:BusStop[] = stopFactory();
    this.routeCalculator = new RouteCalculator(stops);
  }

  public getFastestRoute(from: string, to: string): RouteData {
    const fromStop:BusStop = this.routeCalculator.getStop(from);
    const toStop:BusStop = this.routeCalculator.getStop(to);
    const routes:BusStop[][] = this.routeCalculator.findRoutes(fromStop, toStop);
    const fastest: BusStop[] = this.routeCalculator.calculateFastestRoute(routes);
    //console.log(`Fastest time from ${from} to ${to} is ${this.routeCalculator.calculateRouteTime(fastest)}`);
    const r:RouteData = {
      stops: fastest,
      time: this.routeCalculator.calculateRouteTime(fastest)
    };

    this.route.next(r);
    return r;
  }

  public route$(): Observable<RouteData> {
    return this.route.asObservable();
  }

  getColors(from:BusStop, to:BusStop){
    return getLinesBetweenStops(from, to);
  }

}