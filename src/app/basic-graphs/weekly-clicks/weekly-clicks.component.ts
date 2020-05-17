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
import { getWeekTip } from '../../../assets/util/weekly_clicks_tip';

import { runSpinner, responsivefy } from '../../../assets/util/util_svg_graphs';
import { getDataReady } from '../../../assets/scripts/basic-graphs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/adapters/unsubscribe-on-destroy-adapter';
import { LoaderService } from 'src/app/services/loader.service';
import { LoaderState } from 'src/models/loader-state';
import { getBasicChartsConfig } from '../../../assets/util/basic-charts-config.js';

@Component({
  selector: 'app-weekly-clicks',
  templateUrl: './weekly-clicks.component.html',
  styleUrls: ['./weekly-clicks.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class WeeklyClicksComponent extends UnsubscribeOnDestroyAdapter
  implements OnChanges, OnDestroy {
  @ViewChild('weekChart') chartContainer: ElementRef;
  @Input() data: any;
  chartHeight = 450;
  dataInfo: any;
  isLoading = false;
  wc = getBasicChartsConfig().weeklyChart;

  constructor(
    private basicGraphs: BasicGraphsHttpService,
    private loaderService: LoaderService
  ) {
    super();
  }
  ngOnInit() {
    this.subs.add(
      this.basicGraphs.dataInfoSubj.subscribe((d) => {
        this.dataInfo = d;
      }),
      this.loaderService.loaderState.subscribe((state: LoaderState) => {
        this.isLoading = state.show;
        console.log('IS LOADING', this.isLoading);
        if (this.isLoading) {
          d3.select('#weekChartSvg').remove();
          runSpinner(this.chartContainer, this.chartHeight);
        }
      })
    );
  }

  ngOnChanges(): void {
    if (!this.data) {
      return;
    }
    // create chart
    this.createChart();
  }

  //----------- CREATE CHART -------------
  private createChart(): void {
    d3.select('#weekChartSpinner').remove();
    const element = this.chartContainer.nativeElement;

    // ----------- GET DATA -------------
    const data = getDataReady(this.data.data);
    console.log('ready data', data);

    // ---------- SVG -----------
    const svg = d3
      .select(element)
      .append('svg')
      .attr('id', 'weekChartSvg')
      .attr('width', element.offsetWidth)
      .attr('height', this.chartHeight)
      .call(responsivefy);

    const contentWidth =
      element.offsetWidth - data.margin.left - data.margin.right;
    const contentHeight =
      element.offsetHeight - data.margin.top - data.margin.bottom;
    const aspect = contentWidth / contentHeight;

    console.log('c. w.', contentWidth);
    console.log('c. h.', contentHeight);
    console.log('data', data);

    // ----------- TIP ------------
    const tip = getWeekTip(contentWidth, contentHeight);
    svg.call(tip);

    var areaColors = d3
      .scaleOrdinal()
      .domain(['uniqueClicks', 'totalClicks'])
      .range([this.wc.styles.totalAreaFill, this.wc.styles.uniqueAreaFill]);

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

    areaColors.domain(
      data.dataTotalClicks.map(function (c) {
        return c.key;
      })
    );

    g.append('g')
      .attr('transform', `translate(${0}, ${contentHeight})`)
      .attr('class', 'axisWhite')
      .call(d3.axisBottom(x).tickFormat(data.formateWeeks))
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
      .selectAll('.areas')
      .data(data.dataAllClicks)
      .enter()
      .append('g')
      .attr('id', function (d) {
        return `area-${d.key}-week`;
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
    const lineColors = d3
      .scaleOrdinal()
      .domain(['uniqueLine', 'totalLine'])
      .range([this.wc.styles.totalLineStroke, this.wc.styles.uniqueLineStroke]);

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
      .data(data.dataAllClicks)
      .enter()
      .append('g')
      .attr('id', function (d) {
        return `line-${d.key}-week`;
      })
      .attr('class', function (d) {
        return `line-${d.key}-week`;
      });

    lineSource
      .append('path')
      .attr('d', function (d) {
        return line(d.value);
      })
      .attr('fill', 'none')
      .attr('stroke-width', this.wc.styles.linesStrokWidth)
      .attr('stroke', (d) => lineColors(d.key));

    // TOTAL-CLICKS CIRCLES
    var totalClicksCircles = g
      .selectAll('total')
      .data(data.dataAllClicks[0].value)
      .enter()
      .append('g')
      .attr('class', this.wc.htmlAttrs.circlesTotalClass);

    totalClicksCircles
      .append('circle')
      .attr('cx', function (d) {
        return x(d.date);
      })
      .attr('cy', function (d) {
        return y(d.clicks);
      })
      .attr('r', this.wc.totalCircleR)
      .attr('fill', this.wc.styles.totalCircleFill)
      .attr('stroke', this.wc.styles.totalCircleStroke)
      .attr('stroke-width', this.wc.styles.totalCircleStrokeWidth)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

    // UNIQUE-CLICKS CIRCLES
    var uniqueClicksCircles = g
      .selectAll('unique')
      .data(data.dataAllClicks[1].value)
      .enter()
      .append('g')
      .attr('class', this.wc.uniqueCirclesClassN);

    uniqueClicksCircles
      .append('circle')
      .attr('cx', function (d) {
        return x(d.date);
      })
      .attr('cy', function (d) {
        return y(d.clicks);
      })
      .attr('r', this.wc.uniqueCircleR)
      .attr('fill', this.wc.styles.uniqueCircleFill)
      .attr('stroke', this.wc.styles.uniqueCircleStroke)
      .attr('stroke-width', this.wc.styles.uniqueCircleStrokeWidth)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  }
}
