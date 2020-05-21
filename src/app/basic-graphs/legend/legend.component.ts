import {
  Component,
  Input,
  AfterViewInit,
  OnInit,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
} from '@angular/core';
import { getWeeklyChart } from 'src/charts-settings/weekly-chart';
import {
  getLineLegend,
  getAreaLegend,
} from '../../../assets/util/basic-charts-config';

import { ViewEncapsulation } from '@angular/core';
//import { WeeklyChart } from 'src/charts-settings/weekly-chart';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BasicTimeFrameChart } from 'src/models/basic-time-frame-charts/basic-time-frame-chart.model';
import { Legend } from 'src/models/basic-time-frame-charts/legend.model';
import { element } from 'protractor';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LegendComponent implements AfterViewInit {
  checked = true;
  isLoading = false;
  chart: BasicTimeFrameChart = getWeeklyChart(['totalClicks', 'uniqueClicks']);
  chartLegends: Legend[] = this.chart.legends;

  constructor() {}

  ngAfterViewInit() {
    console.log('ngAfterViewInit legend data', this.chart);
    this.createLegend(this.chart);
  }

  //---------------------------------------//
  //               CREATE LEGEND           //
  //---------------------------------------//
  private createLegend(chart: BasicTimeFrameChart) {
    //this.chartLegends = this.chart.legends;
    // CREATE LINES
    for (let i = 0; i < chart.charts.length; i++) {
      getLineLegend(
        chart.legends[i].htmlLineId,
        chart.charts[i].line.stroke,
        chart.charts[i].line.strokeWidth,
        chart.charts[i].circle.radius,
        chart.charts[i].circle.fill,
        chart.charts[i].circle.stroke,
        chart.charts[i].circle.strokeWidth
      );
    }
    // CREATE AREAS
    for (let i = 0; i < chart.charts.length; i++) {
      getAreaLegend(chart.legends[i].htmlAreaId, chart.charts[i].area.fill);
    }
  }

  // HANDLE CHECKBOXES
  chbxChange(event: MatCheckboxChange) {
    let className = event.source.id.split('_')[0];
    console.log('CHECKED ID', className);
    let opacity = event.checked === true ? '1' : '0';
    var elements = document.getElementsByClassName(className);

    console.log('Elements from chbxChange', elements);
    for (let i = 0; elements.length; i++) {
      console.log(`element-${i}: ${elements[i]}`);
      elements[i].setAttribute('opacity', opacity);
    }
  }
}
