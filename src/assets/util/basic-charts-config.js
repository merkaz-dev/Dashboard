import * as d3 from "d3";

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

function getRectLegend(rectHtmlId, rectFill) {
  const svg = d3
    .select(`#${rectHtmlId}`)
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

  return svg;
}

export { getLineLegend, getRectLegend };
