import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './reittiopas/map/map.component';
import { ReittiopasComponent } from './reittiopas/reittiopas.component';
import { SelectionButtonComponent } from './reittiopas/selection-button/selection-button.component';
import { ResultsComponent } from './reittiopas/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ReittiopasComponent,
    SelectionButtonComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
