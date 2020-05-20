export class Area {
  fill: string;
  classN: string;
  constructor(chartType: string, key: string) {
    this.fill = '';
    this.classN = `${chartType}-${key}-area`;
  }
}
