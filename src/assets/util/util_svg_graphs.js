import * as d3 from "d3";
// ----------- RUN_SPINNER -----------
function runSpinner(chartContainer, spinnerSvgHeight, spinnerSvgId) {
  const element = chartContainer.nativeElement;
  const width = element.offsetWidth;
  const height = spinnerSvgHeight;

  const svg = d3
    .select(element)
    .append("svg")
    .attr("id", spinnerSvgId)
    .attr("width", width)
    .attr("height", height);

  var g = svg
    .append("g")
    .attr("transform", `translate(${width / 2 - 50},${height / 2 - 50})`)
    .style("background-color", "green");

  g.append("image")
    .attr("xlink:href", "../../../assets/icons/svg/spinner-1.svg")
    .attr("width", 100)
    .attr("height", 100);
}

//------- RESPONSIFY ---------
function responsivefy(svg) {
  // Container is the DOM element, svg is appended.
  // Then we measure the container and find its
  // aspect ratio.
  const container = d3.select(svg.node().parentNode);
  const width = parseInt(svg.style("width"), 10);
  const height = parseInt(svg.style("height"), 10);
  const aspect = width / height;
  const elementId = `#${container.attr("id")}`;

  // Add viewBox attribute to set the value to initial size
  // add preserveAspectRatio attribute to specify how to scale
  // and call resize so that svg resizes on page load
  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMinYMid")
    .call(resize, elementId);

  d3.select(window).on("resize." + elementId, resize, elementId);

  // ---------- RESIZE ----------
  function resize() {
    const targetWidth = parseInt(
      d3
        .select(`#${container.attr("id")}`)
        .node()
        .getBoundingClientRect().width
    );
    svg.attr("width", targetWidth);
    svg.attr("height", Math.round(targetWidth / aspect));
  }
}

export { runSpinner, responsivefy };
