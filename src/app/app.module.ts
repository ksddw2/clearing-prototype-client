import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TradeBlotter } from './components/TradeBlotter';
import { MarginCalls } from './components/MarginCalls';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular';

import {HttpClientModule} from '@angular/common/http';

import { AppService } from './services/app.service';
import 'ag-grid-enterprise';

@NgModule({
  declarations: [
    AppComponent,
    TradeBlotter,
    MarginCalls
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
