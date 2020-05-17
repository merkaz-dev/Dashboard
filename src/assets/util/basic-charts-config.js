import * as d3 from "d3";

function getBasicChartsConfig() {
  return {
    weeklyChart: {
      title: "Посещения по Неделям",
      uniqueCircleR: 5,
      totalCircleR: 5,
      uniqueCirclesClassN: "circles-unique-week",
      totalCirclesClassN: "circles-totals-week",

      styles: {
        areas: ["rgba(249, 208, 87, 0.7)", " rgba(54, 174, 175, 0.65)"],
        linesStrokWidth: "0.2em",
        uniqueAreaFill: "rgba(249, 208, 87, 0.7)",
        totalAreaFill: "rgba(54, 174, 175, 0.65)",
        uniqueLineStroke: "green",
        totalLineStroke: "red",
        uniqueCircleFill: "yellow",
        uniqueCircleStroke: "gray",
        uniqueCircleStrokeWidth: 3,
        totalCircleFill: "maroon",
        totalCircleStroke: "steelblue",
        totalCircleStrokeWidth: 3,
      },
      htmlAttrs: {
        areaUniqueId: "area-unique-week",
        areatotalId: "area-total-week",
        lineUniqueId: "line-unique-week-chart",
        lineTotalId: "line-total-week-chart",
        circlesTotalClass: "circles-total-week",
        circlesUniqueClass: "circles-unique-week",
      },
      legend: {
        totalLineHtmlId: "total-line-week-chart-legend",
        totalClassN: "total-line-legend",
        uniqueClassN: "unique-line-legend",
        uniqueLineHtmlId: "unique-line-week-chart-legend",
      },
    },
  };
}

function getLineLegend(
  lineHtmlId,
  classN,
  lineStoke,
  linesStrokWidth,
  circleR,
  circleFill,
  circleStroke,
  circleStrokeWidth
) {
  var svg = d3
    .select(`#${lineHtmlId}`)
    .append("svg")
    .attr("height", 25)
    .attr("width", 60);

  var g = svg.append("g").attr("transform", "translate(0,0)");

  var line = g
    .append("line")
    .attr("x1", 0)
    .attr("y1", 10)
    .attr("x2", 60)
    .attr("y2", 10)
    .attr("class", classN)
    .style("stroke", lineStoke)
    .style("stroke-width", linesStrokWidth);

  var circle = g
    .append("circle")
    .attr("cx", 30)
    .attr("cy", 10)
    .attr("r", circleR)
    .attr("class", classN)
    .style("fill", circleFill)
    .style("stroke", circleStroke)
    .style("stroke-width", circleStrokeWidth);
  return svg;
}

export { getBasicChartsConfig, getLineLegend };
