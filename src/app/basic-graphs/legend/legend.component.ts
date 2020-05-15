import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as d3 from 'd3';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnChanges, OnInit {
  disabled = false;
  @Input('checked') checked = true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  constructor() {}
  ngOnInit() {
    this.getLine();
    this.getRect();
  }
  ngOnChanges() {}

  getLine() {
    var svg = d3
      .selectAll('.cached')
      .append('svg')
      .attr('height', 25)
      .attr('width', 60);

    var g = svg.append('g').attr('transform', 'translate(0,0)');

    var line = g
      .append('line')
      .attr('x1', 0)
      .attr('y1', 10)
      .attr('x2', 60)
      .attr('y2', 10)
      .style('stroke', 'green')
      .style('stroke-width', 2);

    var circle = g
      .append('circle')
      .attr('cx', 30)
      .attr('cy', 10)
      .attr('r', 6)
      .style('fill', 'red')
      .style('stroke', 'green')
      .style('stroke-width', 2);
    console.log('SVG', svg);
    return svg;
  }
  getRect() {
    var svg = d3
      .selectAll('.rect')
      .append('svg')
      .attr('height', 25)
      .attr('width', 25);

    var g = svg.append('g').attr('transform', 'translate(0,0)');

    var rect = g
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 15)
      .attr('height', 15)
      .style('fill', 'red');
    return svg;
  }
}
