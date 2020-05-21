import * as d3 from "d3";

function getLineLegend(
  lineHtmlId,
  lineStoke,
  linesStrokWidth,
  circleR,
  circleFill,
  circleStroke,
  circleStrokeWidth
) {
  var svg = d3
    //.select("#weeklyChart-totalClicks-line-legend")
    .selectAll(`#${lineHtmlId}`)
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
    .style("stroke", lineStoke)
    .style("stroke-width", linesStrokWidth);

  var circle = g
    .append("circle")
    .attr("cx", 30)
    .attr("cy", 10)
    .attr("r", circleR)
    .style("fill", circleFill)
    .style("stroke", circleStroke)
    .style("stroke-width", circleStrokeWidth);

  //console.log("SVG classN", classN);
  console.log("SVG lineHtmlId", lineHtmlId);
  console.log("SVG", svg);
  return svg;
}

function getAreaLegend(areaHtmlId, rectFill) {
  const svg = d3
    .selectAll(`#${areaHtmlId}`)
    .append("svg")
    .attr("height", 25)
    .attr("width", 25);

  var g = svg.append("g").attr("transform", "translate(0,0)");

  var rect = g
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 17)
    .attr("height", 17)
    .style("fill", rectFill);
  console.log("SVG areaHtmlId", areaHtmlId);
  console.log("SVG", svg);
  return svg;
}

export { getLineLegend, getAreaLegend };
