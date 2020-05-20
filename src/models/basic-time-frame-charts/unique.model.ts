import { Area } from './area.model';
import { Line } from './line.models';
import { Circle } from './circle.model';

export class Unique {
  area: Area;
  line: Line;
  circle: Circle;

  constructor() {
    this.area = new Area();
    this.line = new Line();
    this.circle = new Circle();
  }
}
