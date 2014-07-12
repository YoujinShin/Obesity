var color = d3.scale.category20().domain(d3.range(4)), //# of colors
    selectedColor = 0,
    dragColor;

var legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", "translate("+((width-color.domain().length*24)/2)+",30)")
    .style("cursor", "pointer")
  .selectAll("rect")
    .data(color.domain())
  .enter().append("rect")
    .attr("x", function(d) { return d * 24; })
    .attr("width", 24 - 8)
    .attr("height", 24 - 8)
    .style("stroke", function(d) { return d ? null : "red"; })
    .style("fill", color)
    .on("click", clicklegend);

function clicklegend(d) {
  legend[0][selectedColor].style.stroke = null;
  legend[0][selectedColor = d].style.stroke = "red";
}