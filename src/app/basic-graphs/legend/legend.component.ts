import { Component, Input, AfterViewInit } from '@angular/core';
import { getWeeklyChart } from 'src/charts-settings/weekly-chart';
import {
  getLineLegend,
  getRectLegend,
} from '../../../assets/util/basic-charts-config';
import { ViewEncapsulation } from '@angular/core';
//import { WeeklyChart } from 'src/charts-settings/weekly-chart';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BasicTimeFrameChart } from 'src/models/basic-time-frame-charts/basic-time-frame-chart.model';
import { Legend } from 'src/models/basic-time-frame-charts/legend.model';
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LegendComponent implements AfterViewInit {
  // disabled = false;

  // @Input('totalLinechecked') totalLinechecked = true;
  // checked = true;
  // @Input('chart') chart: BasicTimeFrameChart;

  // chartLegends: Legend[];

  constructor() {
    //this.chartLegends = this.chart.legends;
    //console.log(this.chart.legends);
  }

  ngAfterViewInit() {
    //   // TOTAL LINE LEGEND
    //   for (let i = 0; i < this.chart.charts.length; i++) {
    //     getLineLegend(
    //       this.chart.legends[i].htmlLineId,
    //       this.chart[i].line.classN,
    //       this.chart[i].line.stroke,
    //       this.chart[i].line.strokeWidth,
    //       this.chart[i].circle.radius,
    //       this.chart[i].circle.fill,
    //       this.chart[i].circle.stroke,
    //       this.chart[i].circle.strokeWidth
    //     );
    //   }
    // UNIQUE LINE LEGEND
    // for (let i = 0; i < this.chart.charts.length; i++) {
    //   getLineLegend(
    //     this.chart.legends[i].htmlLineId,
    //     this.chart[i].line.classN,
    //     this.chart[i].line.stroke,
    //     this.chart[i].line.strokeWidth,
    //     this.chart[i].circle.radius,
    //     this.chart[i].circle.fill,
    //     this.chart[i].circle.stroke,
    //     this.chart[i].circle.strokeWidth
    //   );
  }

  // TOTAL RECT LEGEND
  // for (let i = 0; i < this.chart.charts.length; i++) {
  //   getRectLegend(this.chart.legends[i].htmlAreaId, this.chart[i].area.fill);
  // }
}

// totalLineChange(event: MatCheckboxChange) {
//   let className = event.source.id.split('_')[0];
//   console.log('CHECKED ID', className);
//   let opacity = event.checked === true ? '1' : '0';
//   var elements = document.getElementsByClassName(className);
//   console.log(elements);
//   for (let i = 0; elements.length; i++) {
//     elements[i].setAttribute('opacity', opacity);
//   }
//}
//}
