export class Line {
  stroke: string;
  strokeWidth: Number;
  classN: string;

  constructor(chartType: string, key: string) {
    this.stroke = '';
    this.strokeWidth = 0;
    this.classN = `${chartType}-${key}-line`;
  }
}
