import { Component, Input, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import {
  getBasicChartsConfig,
  getLineLegend,
} from '../../../assets/util/basic-charts-config.js';
import { ViewEncapsulation } from '@angular/core';
import { log } from 'util';
@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LegendComponent implements AfterViewInit {
  disabled = false;
  @Input('totalLinechecked') totalLinechecked = true;
  @Input('checked') checked = true;
  wc = getBasicChartsConfig().weeklyChart;
  totalLineHtmlId = this.wc.legend.totalLineHtmlId;
  uniqueLineHtmlId = this.wc.legend.uniqueLineHtmlId;
  constructor() {}

  ngAfterViewInit() {
    //TOTAL LINE LEGEND
    getLineLegend(
      this.wc.legend.totalLineHtmlId,
      this.wc.legend.totalClassN,
      this.wc.styles.totalLineStroke,
      this.wc.styles.linesStrokWidth,
      this.wc.totalCircleR,
      this.wc.styles.totalCircleFill,
      this.wc.styles.totalCircleStroke,
      this.wc.styles.totalCircleStrokeWidth
    );

    //UNIQUE LINE LEGEND
    getLineLegend(
      this.wc.legend.uniqueLineHtmlId,
      this.wc.legend.uniqueClassN,
      this.wc.styles.uniqueLineStroke,
      this.wc.styles.linesStrokWidth,
      this.wc.uniqueCircleR,
      this.wc.styles.uniqueCircleFill,
      this.wc.styles.uniqueCircleStroke,
      this.wc.styles.uniqueCircleStrokeWidth
    );
  }

  totalLineChange(checked) {
    console.log('CHECKED', checked);
    let opacity = checked === true ? '1' : '0';

    var elements = document.getElementsByClassName('total-line-week');
    console.log(elements);
    for (let i = 0; elements.length; i++) {
      elements[i].setAttribute('opacity', opacity);
    }
  }

  //Total Line Legend
  // getLine(
  //   elementId,
  //   classN,
  //   lineStoke,
  //   linesStrokWidth,
  //   circleR,
  //   circleFill,
  //   circleStroke,
  //   circleStrokeWidth
  // );
  // getLine() {
  //   var svg = d3
  //     .selectAll('.cached')
  //     .append('svg')
  //     .attr('height', 25)
  //     .attr('width', 60);

  //   var g = svg.append('g').attr('transform', 'translate(0,0)');

  //   var line = g
  //     .append('line')
  //     .attr('x1', 0)
  //     .attr('y1', 10)
  //     .attr('x2', 60)
  //     .attr('y2', 10)
  //     .style('stroke', 'green')
  //     .style('stroke-width', 2);

  //   var circle = g
  //     .append('circle')
  //     .attr('cx', 30)
  //     .attr('cy', 10)
  //     .attr('r', 6)
  //     .style('fill', 'red')
  //     .style('stroke', 'green')
  //     .style('stroke-width', 2);
  //   console.log('SVG', svg);
  //   return svg;
  // }
  // getRect() {
  //   var svg = d3
  //     .selectAll('.rect')
  //     .append('svg')
  //     .attr('height', 25)
  //     .attr('width', 25);

  //   var g = svg.append('g').attr('transform', 'translate(0,0)');

  //   var rect = g
  //     .append('rect')
  //     .attr('x', 0)
  //     .attr('y', 0)
  //     .attr('width', 15)
  //     .attr('height', 15)
  //     .style('fill', 'red');
  //   return svg;
  // }
}
