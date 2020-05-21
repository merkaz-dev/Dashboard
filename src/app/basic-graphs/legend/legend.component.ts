import { Component, Input, OnChanges } from '@angular/core';
import { getWeeklyChart } from 'src/charts-settings/weekly-chart';
import {
  getLineLegend, //NOT NEEDED???
  getAreaLegend, //NOT NEEDED???
} from '../../../assets/util/basic-charts-config';

import { ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BasicTimeFrameChart } from 'src/models/basic-time-frame-charts/basic-time-frame-chart.model';

import { BasicChart } from 'src/models/basic-time-frame-charts/basic-chart.model';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LegendComponent implements OnChanges {
  checked = true;

  @Input() chart: BasicTimeFrameChart;
  charts: BasicChart[];
  constructor() {}

  ngOnChanges() {
    if (!this.chart) {
      return;
    }
    this.charts = this.chart.charts;
  }
  //---------------------------------------//
  //              HANDLE CHECKBOXES        //
  //---------------------------------------//
  chbxChange(event: MatCheckboxChange) {
    let className = event.source.id.split('_')[0];
    console.log('CHECKED ID', className);
    let opacity = event.checked === true ? '1' : '0';
    var elements = document.getElementsByClassName(className);
    console.log('Elements from chbxChange', elements);
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('opacity', opacity);
    }
  }
}
