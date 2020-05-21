import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
// import data from '../../testData/articles.json';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { BasicGraphsHttpService } from './basic-graphs-http.service';
import { UnsubscribeOnDestroyAdapter } from '../adapters/unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-basic-graphs',
  templateUrl: './basic-graphs.component.html',
  styleUrls: ['./basic-graphs.component.css'],
})
export class BasicGraphsComponent extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit, OnDestroy {
  private uri =
    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/wikistorestitchapp-vgkfz/service/wikiStoreStats/incoming_webhook/s_ch_9_weekly_clicks_for_time_period?startDate=2020-1-1&endDate=2020-3-3&secret=wikistore';

  data: any;
  constructor(private basicGraphs: BasicGraphsHttpService) {
    super();
  }

  ngOnInit() {
    this.subs.add(
      this.basicGraphs.getWeeklyClicks().subscribe((d) => {
        this.data = d;
        this.basicGraphs.processDataInfo(this.data.info);
        console.log('data from MongoDb', this.data);
      })
    );
  }
  ngAfterViewInit() {}
}
