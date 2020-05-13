import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeDatepickerComponent } from './range-datepicker/range-datepicker.component';
import { AppMaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [RangeDatepickerComponent],
  imports: [CommonModule, AppMaterialModule, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [RangeDatepickerComponent],
})
export class DatepickersModule {}
