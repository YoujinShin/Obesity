var margin = { top:25, right:40, bottom:20, left:20 };

var widthS = parseInt(d3.select('#scatterG').style('width'), 10),
    widthS = widthS - margin.left - margin.right,
    heightS = widthS*0.55;
    heightS = heightS - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

var x = d3.time.scale()
    .range([0, widthS]);

var y = d3.scale.linear()
    .domain([4, 40])
    .range([heightS, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svgS = d3.select("#scatterG").append("svg")
    .attr("width", widthS + margin.left + margin.right)
    .attr("height", heightS + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var rate = d3.map();
var obesity_data = "obesity_data.tsv";

queue()
  .defer(d3.tsv, "obesity_data.tsv")
  .await(makeBar);

function makeScatter() {
  queue()
    .defer(d3.tsv, "obesity_data.tsv")
    .await(makeBar);
}

function makeBar(error, us) {

  var bg = svgS.append("rect")
                .attr("x", -margin.left)
                .attr("y", -margin.top)
                .attr("width", widthS + margin.left + margin.right + 100)
                .attr("height", heightS + margin.top + margin.bottom)
                .style("fill", "white");

  us.forEach(function(d) {
    d.year = parseDate(d.year);
  });

  x.domain(d3.extent(us, function(d) {  return d.year; }));
  var extent = d3.extent(us, function(d) { return d.year; });

  var parseString = d3.format("d");
  var currentYear = parseDate( parseString(year) );

  var rectangle = svgS.append("rect")
                .attr("x", x(currentYear) - 10)
                .attr("y", 10)
                .attr("width", 20)
                .attr("height", heightS-10)
                .style("fill", "rgba(0,0,0,0.0)")
                // .style("fill", "rgba(10,10,10,0.1)")
                .attr("stroke-width", 1)
                .attr("stroke", "black");
                // .attr("stroke", "rgb(180,180,180)");

  var bar = svgS.selectAll(".dot")
                .data(us)
              .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 2.2)
                .attr("cx", function(d) { return x(d.year); })
                .attr("cx", function(d) { return x(d.year); })
                .attr("cy", function(d) { return y(d.rate); })
                .attr("class", function(d) { return quantize(d.rate); })
                .on("mouseover", function(d){
                  var tempText;
                  tempText = tooltip.text(d.state+" - "+d.rate+"%" );
                  this.style.stroke = "black";

                  tooltip.style("visibility", "visible");
                })
                .on("mousemove", function(){
                  tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                .on("mouseout", function(){
                  this.style.stroke = "none";
                  tooltip.style("visibility", "hidden");})
                .on("click", function(d) {

                });

  svgS.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ heightS +")")
    // .ticks(5)
    .call(xAxis);
  // .append("text")
  //   // .attr("class", "xlabel")
  //   .attr("x", widthS)
  //   .attr("y", -6)
  //   .style("text-anchor", "end")
  //   .text("Year");

  // var color = d3.scale.category10();

  // // var color = ["rgb(255,0,0)", "rgb(0,0,255)"];
  // // var color = ["#fff", "#000"];

  // // console.log(color);

  // var legend = svgS.selectAll(".legend")
  //     .data(color)
  //   .enter().append("g")
  //     // .attr("class", "legend")
  //     .attr("transform", function(d, i) { 
  //       // console.log(d);
  //       // return "translate(0," + i * 20 + ")"; 
  //       return "translate(" + i * 20 + ",10)"; 
  //     });

  // legend.append("rect")
  //     .attr("x", width - 18)
  //     .attr("width", 18)
  //     .attr("height", 18)
  //     .style("fill", color);

  // legend.append("text")
  //     .attr("x", width - 24)
  //     .attr("y", 9)
  //     .attr("dy", ".35em")
  //     .style("text-anchor", "end")
  //     .text(function(d) { return d; });

}
