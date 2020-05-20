import { Area } from './area.model';
import { Line } from './line.models';
import { Circle } from './circle.model';
import { Legend } from './legend.model';

export class BasicChart {
  type: string;
  area: Area;
  line: Line;
  circle: Circle;
  legend: Legend;

  constructor(chartType: string, key: string) {
    this.type = key;
    this.area = new Area(chartType, key);
    this.line = new Line(chartType, key);
    this.circle = new Circle(chartType, key);
    this.legend = new Legend(chartType, key);
  }
}
