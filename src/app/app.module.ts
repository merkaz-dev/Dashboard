import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './material.module';
import { MonthlyClicksComponent } from './basic-graphs/monthly-clicks/monthly-clicks.component';
import { WeeklyClicksComponent } from './basic-graphs/weekly-clicks/weekly-clicks.component';
import { BasicGraphsComponent } from './basic-graphs/basic.graphs.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { BasicGraphsHttpService } from './basic-graphs/basic-graphs-http.service';
import { DatepickersModule } from './datepickers/datepickers.module';

import { AccordionComponent } from './accordion/accordion.component';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BasicGraphsComponent,
    MonthlyClicksComponent,
    WeeklyClicksComponent,

    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DatepickersModule,
    AppMaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    BasicGraphsHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
