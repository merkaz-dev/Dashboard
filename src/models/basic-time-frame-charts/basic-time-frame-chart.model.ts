import { Legend } from './legend.model';
import { BasicChart } from './basic-chart.model';
import { CurrencyPipe } from '@angular/common';

export class BasicTimeFrameChart {
  key: string;
  title: string;
  chartType: string;
  svgId: string;
  spinnerId: string;
  height: Number;
  yAxisLabel: string;
  xAxisLabel: string;
  charts: BasicChart[];
  legends: Legend[];
  areaDomainNames: string[];
  areaDomainFills: string[];
  lineDomainNames: string[];
  lineDomainStrokes: string[];
  constructor(
    title: string,
    svgId: string,
    spinnerId: string,
    height: Number,
    yAxisLabel: string,
    xAxisLabel: string,
    charts: BasicChart[]
  ) {
    this.title = title;
    this.svgId = svgId;
    this.spinnerId = spinnerId;
    this.height = height;
    this.yAxisLabel = yAxisLabel;
    this.xAxisLabel = xAxisLabel;
    this.charts = charts;

    this.legends = this.getLegends(this.charts);
    this.areaDomainNames = this.getAreaDomainNames(this.charts);
    this.areaDomainFills = this.getAreaDomainFills(this.charts);
    this.lineDomainNames = this.getLineDomainNames(this.charts);
    this.lineDomainStrokes = this.getLineDomainStrokes(this.charts);
  }

  private getLegends(charts: BasicChart[]) {
    let array = [];
    charts.forEach((chart) => {
      array.push(chart.legend);
    });
    return array;
  }

  private getAreaDomainNames(charts: BasicChart[]) {
    let array = [];
    charts.forEach((chart) => {
      array.push(chart.area.classN);
    });
    return array;
  }

  private getAreaDomainFills(charts: BasicChart[]) {
    let array = [];
    charts.forEach((chart) => {
      array.push(chart.area.fill);
    });
    return array;
  }

  private getLineDomainNames(charts: BasicChart[]) {
    let array = [];
    charts.forEach((chart) => {
      array.push(chart.line.classN);
    });
    return array;
  }

  private getLineDomainStrokes(charts: BasicChart[]) {
    let array = [];
    charts.forEach((chart) => {
      array.push(chart.line.stroke);
    });
    return array;
  }

  getLineClassN(data: any) {
    let chart = this.charts.filter((chart) => chart.type === data.key);
    return chart[0].line.classN;
  }

  getAreaClassN(data: any) {
    let chart = this.charts.filter((chart) => chart.type === data.key);
    return chart[0].area.classN;
  }
}
