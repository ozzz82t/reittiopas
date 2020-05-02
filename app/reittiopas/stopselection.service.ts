import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StopselectionService {
  

  private startpoint$ = new Subject<string>();
  private endpoint$ = new Subject<string>();

  public startpoint:string = "";
  public endpoint:string = "";
  
  setStartpoint(point: string) {
    this.startpoint = point;
    this.startpoint$.next(point);
  }

  getStartpoint(): Observable<any> {
    return this.startpoint$.asObservable();
  }


  setEndpoint(point: string) {
    this.endpoint = point;
    this.endpoint$.next(point);
  }

  getEndpoint(): Observable<any> {
    return this.endpoint$.asObservable();
  }




}
