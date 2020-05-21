import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { BasicGraphsHttpService } from 'src/app/basic-graphs/basic-graphs-http.service';
const _moment = _rollupMoment || moment;

@Component({
  selector: 'app-range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.css'],
})
export class RangeDatepickerComponent implements OnInit, AfterViewInit {
  toDate: FormControl;
  fromDate: FormControl;
  @Input() dataInfo: any;
  constructor(
    private _adapter: DateAdapter<any>,
    private basicGraphs: BasicGraphsHttpService
  ) {}

  ngOnInit(): void {
    // this.basicGraphs.dataInfoSubj.subscribe((d) => {
    //   this.dataInfo = d;

    //SETUP DATES
    this.toDate = new FormControl(moment(new Date(this.dataInfo.endDate)));
    this.fromDate = new FormControl(moment(new Date(this.dataInfo.startDate)));
    //});
    this._adapter.setLocale('ru');
  }
  ngAfterViewInit() {}
  readDates() {
    // const daysAfterMonday = moment(this.fromDate.value).isoWeekday() - 1;
    // const daysToSunday = 7 - moment(this.toDate.value).isoWeekday();

    // let from = moment(this.fromDate.value).subtract(daysAfterMonday, 'day');
    // if (from < moment().startOf('year')) {
    //   from = moment().startOf('year');
    // }
    // let to = moment(this.toDate.value).add(daysToSunday, 'day');
    this.basicGraphs.reload(
      moment(this.fromDate.value),
      moment(this.toDate.value)
    );
  }
}
