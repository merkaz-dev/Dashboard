import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { BasicGraphsHttpService } from '../basic-graphs-http.service';

import * as d3 from 'd3';
import { getWeekTip } from '../../../assets/util/weekly_clicks_tip';

import { getDataReady } from '../../../assets/scripts/basic-graphs';

@Component({
  selector: 'app-monthly-clicks',
  templateUrl: './monthly-clicks.component.html',
  styleUrls: ['./monthly-clicks.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MonthlyClicksComponent implements OnChanges {
  @ViewChild('chart') chartContainer: ElementRef;
  @Input() data: any;
  constructor(private basicGraphs: BasicGraphsHttpService) {}
  ngOnInit() {}
  ngOnChanges(): void {
    if (!this.data) {
      return;
    }
    this.createChart();
  }

  //----------- CREATE CHART -------------
  private createChart(): void {
    d3.select('svg').remove();
    const data = getDataReady(this.data.data);
    console.log('ready data', data);

    const element = this.chartContainer.nativeElement;

    // ----------- SVG ------------
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', 450);

    const contentWidth =
      element.offsetWidth - data.margin.left - data.margin.right;
    const contentHeight =
      element.offsetHeight - data.margin.top - data.margin.bottom;
    console.log('c. w.', contentWidth);
    console.log('c. h.', contentHeight);
    console.log('data', data);

    // ----------- TIP ------------
    const tip = getWeekTip(contentWidth, contentHeight);
    svg.call(tip);

    var color = d3
      .scaleOrdinal()
      .domain(['uniqueClicks', 'totalClicks'])
      .range(['rgba(249, 208, 87, 0.7)', 'rgba(54, 174, 175, 0.65)']);

    var x = d3.scaleTime().range([0, contentWidth]),
      y = d3.scaleLinear().range([contentHeight, 0]),
      z = color;

    var area = d3
      .area()
      .curve(d3.curveMonotoneX)
      .x(function (d) {
        return x(d.date);
      })
      .y0(y(0))
      .y1(function (d) {
        return y(d.clicks);
      });

    var g = svg
      .append('g')
      .attr('transform', `translate(${data.margin.left}, ${data.margin.top})`);

    x.domain(
      d3.extent(data.dataTotalClicks[0].value, function (d) {
        return d.date;
      })
    );

    y.domain([
      0,
      d3.max(data.dataTotalClicks, function (c) {
        return d3.max(c.value, function (d) {
          return data.formateNumberK(d.clicks);
        });
      }),
    ]);

    z.domain(
      data.dataTotalClicks.map(function (c) {
        return c.key;
      })
    );

    g.append('g')
      .attr('transform', `translate(${0}, ${contentHeight})`)
      .attr('class', 'axisWhite')
      .call(d3.axisBottom(x).tickFormat(data.formateWeeks).tickNumber(53))
      .append('text')
      .attr('x', contentWidth)
      .attr('dy', '2.7em')
      .attr('text-anchor', 'end')
      //.attr('class', 'axis-x-text')
      .style('fill', 'black')
      //.style('font-size', '1.3em')
      .text('Недели');

    g.append('g')
      .attr('class', 'axisWhite')
      .call(d3.axisLeft(y))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 11)
      .attr('х', -30)
      .attr('dy', '-0.9em')
      .attr('dx', '3.4em')
      .style('fill', 'black')
      //.style('font-size', '1.3em')
      .attr('fill', 'black')
      .text('Клики');

    var areaSource = g
      .selectAll('.area')
      .data(data.dataAllClicks)
      .enter()
      .append('g')
      .attr('class', function (d) {
        return `area ${d.key}`;
      });

    areaSource
      .append('path')
      .attr('d', function (d) {
        return area(d.value);
      })
      .style('fill', function (d) {
        return z(d.key);
      });

    //LINE
    const lineColor = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3
      .line()
      .x(function (d) {
        return x(d.date);
      }) // set the x values for the line generator
      .y(function (d) {
        return y(d.clicks);
      }) // set the y values for the line generator
      .curve(d3.curveMonotoneX);

    var lineSource = g
      .selectAll('.line')
      .data(data.dataAllClicks)
      .enter()
      .append('g')
      .attr('class', function (d) {
        return `line ${d.key}`;
      });

    lineSource
      .append('path')
      .attr('d', function (d) {
        return line(d.value);
      })
      .attr('fill', 'none')
      .attr('stroke-width', '0.1em')
      .attr('stroke', (d) => lineColor(d.key));

    // TOTAL-CLICKS CIRCLES
    var totalClicksCircles = g
      .selectAll('total')
      .data(data.dataAllClicks[0].value)
      .enter()
      .append('g')
      .attr('class', 'circles total');

    totalClicksCircles
      .append('circle')
      .attr('cx', function (d) {
        return x(d.date);
      })
      .attr('cy', function (d) {
        return y(d.clicks);
      })
      .attr('r', 4)
      .attr('fill', 'red')
      .attr('stroke', 'none')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    // UNIQUE-CLICKS CIRCLES
    var uniqueClicksCircles = g
      .selectAll('total')
      .data(data.dataAllClicks[1].value)
      .enter()
      .append('g')
      .attr('class', 'circles total');

    uniqueClicksCircles
      .append('circle')
      .attr('cx', function (d) {
        return x(d.date);
      })
      .attr('cy', function (d) {
        return y(d.clicks);
      })
      .attr('r', 4)
      .attr('fill', 'blue')
      .attr('stroke', 'none')
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  }
}
