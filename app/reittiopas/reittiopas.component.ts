import { StopselectionService } from './stopselection.service';
import { BusStop } from './../routefinder/busStop';
import { RoutefinderService, RouteData } from './../routefinder/routefinder.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-reittiopas",
  templateUrl: "./reittiopas.component.html",
  styleUrls: ["./reittiopas.component.css"]
})
export class ReittiopasComponent implements OnInit {

  public route: RouteData;

  constructor(
    private routefinderService: RoutefinderService,
    private stopselectionService: StopselectionService
  ){}

  ngOnInit(): void {}

  getRoute(){
    const start = this.stopselectionService.startpoint;
    const end = this.stopselectionService.endpoint;

    if(start == "" || end == ""){
      alert("Sekä lähtö- että päätepysäkki tulee valita.");
      return;
    }

    if(start == end) {
      alert("Lähtö- ja päätepysäkki eivät voi olla samat.");
      return;
    }

    this.routefinderService.getFastestRoute(start, end);
  }

}
