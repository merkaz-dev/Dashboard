import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

import {
  switchMap,
  map,
  tap,
  take,
  catchError,
  switchMapTo,
  retry,
} from 'rxjs/operators';
import {
  getTextForTitleTimeRange,
  setUpDatesFromMonToSun,
} from './../../assets/util/momentDate.js';
import { BasicTimeFrameChart } from 'src/models/basic-time-frame-charts/basic-time-frame-chart.model.js';
@Injectable({
  providedIn: 'root',
})
export class BasicGraphsHttpService {
  private uri =
    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/wikistorestitchapp-vgkfz/service/wikiStoreStats/incoming_webhook/s_ch_9_weekly_clicks_for_time_period?startDate=2020-01-01&endDate=2020-03-01&secret=wikistore';

  public isLoading = new BehaviorSubject(false);

  public dataInfoSubj = new BehaviorSubject(null);
  public data$ = new BehaviorSubject(this.uri);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getWeeklyChartData(): Observable<any> {
    return this.data$.pipe(
      switchMap((uri) => {
        return this.http.get(uri).pipe(retry(2));
      })
    );
  }

  public reload(fromDate, toDate) {
    const dates = setUpDatesFromMonToSun(fromDate, toDate);

    const uri = `https://webhooks.mongodb-stitch.com/api/client/v2.0/app/wikistorestitchapp-vgkfz/service/wikiStoreStats/incoming_webhook/s_ch_9_weekly_clicks_for_time_period?startDate=${dates.fromDate}&endDate=${dates.toDate}&secret=wikistore`;

    this.data$.next(uri);
  }

  processDataInfo(dataInfo) {
    var obj = {
      titleTimeRange: getTextForTitleTimeRange(
        dataInfo.startDate,
        dataInfo.endDate,
        'ru'
      ),
      title: dataInfo.title,
      startDate: dataInfo.startDate,
      endDate: dataInfo.endDate,
    };
    this.dataInfoSubj.next(obj);
  }
}
