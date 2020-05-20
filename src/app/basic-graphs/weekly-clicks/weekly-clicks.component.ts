import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';

import { BasicGraphsHttpService } from '../basic-graphs-http.service';

import * as d3 from 'd3';
import { getWeekTip } from '../../../assets/util/weekly_chart_tip';

import { runSpinner, responsivefy } from '../../../assets/util/util_svg_graphs';
import { getDataReady } from '../../../assets/scripts/basic-graphs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/adapters/unsubscribe-on-destroy-adapter';
import { LoaderService } from 'src/app/services/loader.service';
import { LoaderState } from 'src/models/loader-state.model';

import { getWeeklyChart } from 'src/charts-settings/weekly-chart';
import { BasicTimeFrameChart } from 'src/models/basic-time-frame-charts/basic-time-frame-chart.model';

@Component({
  selector: 'app-weekly-clicks',
  templateUrl: './weekly-clicks.component.html',
  styleUrls: ['./weekly-clicks.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WeeklyClicksComponent extends UnsubscribeOnDestroyAdapter
  implements OnChanges, OnDestroy {
  @ViewChild('weekChart') chartContainer: ElementRef;
  @Input('data') data: any;

  dataInfo: any;
  keys: string[];
  readyData: any;
  isLoading = false;
  weeklyChart: BasicTimeFrameChart;

  constructor(
    private basicGraphs: BasicGraphsHttpService,
    private loaderService: LoaderService
  ) {
    super();
  }
  ngOnInit() {
    console.log('DATA', this.data);
    this.subs.add(
      this.basicGraphs.getWeeklyClicks().subscribe((d) => {
        this.data = d;
        console.log('DATA from S', this.data);
        this.readyData = getDataReady(this.data.data);
        this.dataInfo = this.data.info;
        this.basicGraphs.processDataInfo(this.data.info);
        this.weeklyChart = getWeeklyChart(['totalClicks', 'uniqueClicks']);

        this.createChart(this.readyData, this.weeklyChart);
      }),
      this.basicGraphs.dataInfoSubj.subscribe((d) => {
        this.dataInfo = d;
        console.log('D I', this.dataInfo);
      }),
      this.loaderService.loaderState.subscribe((state: LoaderState) => {
        this.isLoading = state.show;
        console.log('IS LOADING', this.isLoading);
        if (this.isLoading) {
          d3.select(`#${this.weeklyChart.svgId}`).remove();
          runSpinner(
            this.chartContainer,
            this.weeklyChart.height,
            this.weeklyChart.spinnerId
          );
        }
      })
    );
  }

  ngOnChanges(): void {
    if (!this.readyData) {
      return;
    }
    // create chart
    //this.createChart();
  }

  //----------- CREATE CHART -------------
  private createChart(myReadyData, myWeeklyChart): void {
    const element = this.chartContainer.nativeElement;

    // ----------- GET DATA -------------
    const readyData = myReadyData;
    const weeklyChart = myWeeklyChart;

    d3.select(`#${weeklyChart.spinnerId}`).remove();

    // ---------- SVG -----------
    const svg = d3
      .select(element)
      .append('svg')
      .attr('id', `${weeklyChart.svgId}`)
      .attr('width', element.offsetWidth)
      .attr('height', weeklyChart.height)
      .call(responsivefy);

    const contentWidth =
      element.offsetWidth -
      this.readyData.margin.left -
      this.readyData.margin.right;
    const contentHeight =
      element.offsetHeight -
      this.readyData.margin.top -
      this.readyData.margin.bottom;
    //const aspect = contentWidth / contentHeight;

    console.log('c. w.', contentWidth);
    console.log('c. h.', contentHeight);
    //console.log('data', data);

    // ----------- TIP ------------
    const tip = getWeekTip(contentWidth, contentHeight);
    svg.call(tip);

    var areaColors = d3
      .scaleOrdinal()
      .domain(weeklyChart.areaDomainNames)
      .range(weeklyChart.areaDomainFills);

    var x = d3.scaleTime().range([0, contentWidth]),
      y = d3.scaleLinear().range([contentHeight, 0]);

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
      .attr(
        'transform',
        `translate(${readyData.margin.left}, ${readyData.margin.top})`
      );

    x.domain(
      d3.extent(readyData.dataTotalClicks[0].value, function (d) {
        return d.date;
      })
    );

    y.domain([
      0,
      d3.max(this.readyData.dataTotalClicks, function (c) {
        return d3.max(c.value, function (d) {
          return readyData.formateNumberK(d.clicks);
        });
      }),
    ]);

    areaColors.domain(
      readyData.dataTotalClicks.map(function (c) {
        return c.key;
      })
    );

    g.append('g')
      .attr('transform', `translate(${0}, ${contentHeight})`)
      .attr('class', 'axisWhite')
      .call(d3.axisBottom(x).tickFormat(readyData.formateWeeks))
      .append('text')
      .attr('x', contentWidth)
      .attr('dy', '2.7em')
      .attr('text-anchor', 'end')
      //.attr('class', 'axis-x-text')
      .style('fill', 'black')
      //.style('font-size', '1.3em')
      .text(weeklyChart.xAxisLabel);

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
      .text(weeklyChart.yAxisLabel);

    var areaSource = g
      .selectAll('.areas')
      .data(readyData.dataAllClicks)
      .enter()
      .append('g')
      .attr('class', function (d) {
        return weeklyChart.getAreaClassN(d);
      });

    areaSource
      .append('path')
      .attr('d', function (d) {
        return area(d.value);
      })
      .style('fill', function (d) {
        return areaColors(d.key);
      });

    //LINE
    const lineStrokes = d3
      .scaleOrdinal()
      .domain(weeklyChart.lineDomainNames)
      .range(weeklyChart.lineDomainStrokes);

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
      .selectAll('.lines')
      .data(readyData.dataAllClicks)
      .enter()
      .append('g')
      .attr('class', function (d) {
        return weeklyChart.getLineClassN(d);
      });

    lineSource
      .append('path')
      .attr('d', function (d) {
        return line(d.value);
      })
      .attr('fill', 'none')
      .attr('stroke-width', weeklyChart.charts[0].line.strokeWidth)
      .attr('stroke', (d) => lineStrokes(d.key));

    drawCircles(readyData, weeklyChart.charts);

    function drawCircles(readyData, charts) {
      for (let i = 0; i < charts.length; i++) {
        g.selectAll(charts[i].type)
          .data(readyData.dataAllClicks[i].value)
          .enter()
          .append('g')
          .attr('class', charts[i].circle.classN)
          .append('circle')
          .attr('cx', function (d) {
            return x(d.date);
          })
          .attr('cy', function (d) {
            return y(d.clicks);
          })
          .attr('r', charts[i].circle.radius)
          .attr('fill', charts[i].circle.fill)
          .attr('stroke', charts[i].circle.stroke)
          .attr('stroke-width', charts[i].circle.strokeWidth)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);
      }
    }
  }
}
