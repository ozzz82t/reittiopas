import { StopselectionService } from './../stopselection.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selection-button',
  templateUrl: './selection-button.component.html',
  styleUrls: ['./selection-button.component.css']
})
export class SelectionButtonComponent implements OnInit {

  public startpoint:string ="";
  public endpoint:string ="";

  constructor(private stopselectionService: StopselectionService) {
  }

  ngOnInit(): void {
    this.stopselectionService.getStartpoint().subscribe(stop => {
      console.log("stop received:" + stop);
      this.startpoint = stop;
    });

    this.stopselectionService.getEndpoint().subscribe(stop => {
      console.log("stop received:" + stop);
      this.endpoint = stop;
    });   
  }

}
