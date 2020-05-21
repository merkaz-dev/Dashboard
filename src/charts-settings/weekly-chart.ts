import { BasicTimeFrameChart } from 'src/models/basic-time-frame-charts/basic-time-frame-chart.model';
import { BasicChart } from 'src/models/basic-time-frame-charts/basic-chart.model';

function getWeeklyChart(keys) {
  let charts: BasicChart[] = [];
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] === 'uniqueClicks') {
      let chart = new BasicChart('weeklyChart', keys[i]);
      //chart.line = new Line('weeklyChart', keys[i])
      chart.line.stroke = 'green';
      chart.line.strokeWidth = 2;
      // chart.area = new Area('weeklyChart', keys[i])
      chart.area.fill = 'blue';
      // chart.circle = new Circle('weeklyChart', keys[i]);
      chart.circle.stroke = 'yellow';
      chart.circle.radius = 5;
      chart.circle.strokeWidth = 3;
      chart.legend.title = 'Уникальные';
      //chart.legend.htmlLineId = 'htmlLineId-2';
      //chart.legend.htmlAreaId = 'htmlAreaId-2';
      charts.push(chart);
    }

    if (keys[i] === 'totalClicks') {
      let chart = new BasicChart('weeklyChart', keys[i]);
      //chart.line = new Line('weeklyChart', keys[i])
      chart.line.stroke = 'yellow';
      chart.line.strokeWidth = 2;
      //chart.area = new Area('weeklyChart', keys[i])
      chart.area.fill = 'maroon';
      // chart.circle = new Circle('weeklyChart', keys[i]);
      chart.circle.stroke = 'green';
      chart.circle.radius = 5;
      chart.circle.strokeWidth = 3;
      chart.legend.title = 'Общие';
      //chart.legend.htmlLineId = 'htmlLineId-1';
      //chart.legend.htmlAreaId = 'htmlAreaId-1';
      charts.push(chart);
    }
  }

  let weeklyChart = new BasicTimeFrameChart(
    // title: string,
    // svgId: string,
    // spinnerId: string,
    // height: Number,
    // yAxisLabel: string,
    // xAxisLabel: string,
    // charts: BasicChart[]
    'Еженедельные посещени', // Chart Title
    'weeklyChart', // Chart SVG Id
    'weeklyChartSpinner', // spinnerId
    450, // chart height
    'Клики', // xAsix Label
    'Недели', // yAsix Label
    charts // charts
  );

  console.log('Weekly Chart fomr w-c.ts', weeklyChart);
  return weeklyChart;
}

export { getWeeklyChart };
