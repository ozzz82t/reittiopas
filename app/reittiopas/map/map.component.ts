import { StopselectionService } from './../stopselection.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { locateClick } from './stopLocations';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
    
  private ctx: CanvasRenderingContext2D;

  constructor(private stopselectionService: StopselectionService) {}

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.draw(this.ctx);
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.canvas.nativeElement.addEventListener('click', (e) => {
      const stopName = locateClick((e.clientX - rect.left), (e.clientY - rect.top), 12.5);
      if (stopName) {
        this.stopselectionService.setStartpoint(stopName);
      }
    });
    this.canvas.nativeElement.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const stopName = locateClick((e.clientX - rect.left), (e.clientY - rect.top), 12.5);
      if (stopName) {
        this.stopselectionService.setEndpoint(stopName);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D){
    const image = new Image();
    image.src = '../../assets/Kartta.jpg';
    image.onload = () => {
      this.ctx.drawImage(image, 0, 0);
    };
  }




}
