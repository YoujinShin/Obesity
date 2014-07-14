var margin = { top:20, right:20, bottom:30, left:40 };
//     width = 600 - margin.left - margin.right,
//     height = 340 - margin.top - margin.bottom;

var widthS = parseInt(d3.select('#scatterG').style('width'), 10),
    widthS = widthS - margin.left - margin.right,
    heightS = widthS*0.55;
    heightS = heightS - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y").parse;

// var x = d3.scale.linear()
var x = d3.time.scale()
    // .domain([1995, 2012])
    .range([0, widthS]);

var y = d3.scale.linear()
    .domain([0, 40])
    .range([heightS, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

// var svg = d3.select("body").append("svg")
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

function makeBar(error, us) {


  us.forEach(function(d) {
    // console.log("d.year: "+d.year);
    // console.log("parseDate(d.year): "+parseDate(d.year));
    d.year = parseDate(d.year);
  });

  x.domain(d3.extent(us, function(d) {  return d.year; }));
  var extent = d3.extent(us, function(d) { return d.year; });
  // console.log(extent);

  var parseString = d3.format("s");
  // var currentYear = parseDate(year);
  // console.log( parseDate("1008") );

  var rectangle = svgS.append("rect")
                .attr("x", -5)
                .attr("y", 10)
                .attr("width", 10)
                .attr("height", heightS-10)
                .style("fill", "rgba(0,0,0,0.8)");


  var bar = svgS.selectAll(".dot")
                .data(us)
              .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 2)
                .attr("cx", function(d) {
                  // console.log(x(d.year));
                  return x(d.year); 
                })
                .attr("cx", function(d) { return x(d.year); })
                .attr("cy", function(d) { return y(d.rate); })
                .attr("class", function(d) { return quantize(d.rate); })
                .on("mouseover", function(d){
                  var tempText;
                  tempText = tooltip.text(d.state+" - "+d.rate+"%"+","+ d.year );
                  this.style.stroke = "black";
                  tooltip.style("visibility", "visible");
                })
                .on("mousemove", function(){
                  tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                .on("mouseout", function(){
                  // this.style.stroke = "white";
                  this.style.stroke = "none";
                  tooltip.style("visibility", "hidden");})
                .on("click", function(d) {

                });

  var yearFormat = d3.time.format("%Y");

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
}
