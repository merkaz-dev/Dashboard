export class Circle {
  stroke: string;
  strokeWidth: Number;
  fill: string;
  radius: Number;
  classN: string;
  constructor(chartType: string, key: string) {
    this.stroke = '';
    this.strokeWidth = 0;
    this.fill = '';
    this.radius = 0;
    this.classN = `${chartType}-${key}-line`;
  }
}
