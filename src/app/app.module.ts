import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GreetingComponent } from './greeting/greeting.component';
import { MainformComponent } from './mainform/mainform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './results/results.component';
import { TableComponent } from './table/table.component';
import { ResultformComponent } from './resultform/resultform.component';
import {DotsService} from "./utils/dotservice";
import {RService} from "./utils/rservice";

@NgModule({
  declarations: [
    AppComponent,
    GreetingComponent,
    MainformComponent,
    ResultsComponent,
    TableComponent,
    ResultformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ DotsService, RService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
