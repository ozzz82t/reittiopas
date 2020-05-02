import { Component, OnInit} from '@angular/core';
import { RouteData, RoutefinderService } from './../../routefinder/routefinder.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {

  public time: number;
  public hidden: boolean;
  public routes: any[];

  constructor(private routefinderService:RoutefinderService) {
    this.time = 0;
    this.hidden = true;
  }
   
  ngOnInit(): void {
    this.routefinderService.route$().subscribe((route:RouteData) => {
      this.time = route.time;
      const colors = [];
      for (let i = 0; i < (route.stops.length - 1); i++) {
        colors.push(this.routefinderService.getColors(route.stops[i], route.stops[i+1]));
      }
      const stops = route.stops;

      this.routes = stops.map((stop, i) => {
        return {stop: stop.name, lines: colors[i]};
      });
      this.hidden = false;
    });

  }

}
