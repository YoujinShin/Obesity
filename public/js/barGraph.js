var margin = { top:20, right:20, bottom:30, left:40 },
    width = 600 - margin.left - margin.right,
    height = 340 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

  x.domain([1995, 2012]);
  y.domain([5, 40]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("+ margin.left + "," + margin.top + ")");

var rate = d3.map();
var obesity_data = "obesity_data.tsv";

function quantize(t) {
  var bmiStatus;
  if(t <= 15) {
    bmiStatus = "q0-9";//"Underweight";
  } else if(t > 15 && t <= 20) {
    bmiStatus = "q1-9";//"Normal status";
  } else if(t > 20 && t < 25) {
    bmiStatus = "q2-9";//"Overweight";
  } else if(t >= 25 && t < 30) {
    bmiStatus = "q3-9";//"Obesity";
  } else if(t >= 30) {
    bmiStatus = "q4-9";//"Obesity";
  }
  return bmiStatus;
}

queue()
  // .defer(d3.json, "us-states.json")
  .defer(d3.tsv, "obesity_data.tsv")
  .await(makeBar);

function makeBar(error, us) {

  // var x = d3.scale.linear()
  //   .range([0, width]);

  // var y = d3.scale.linear()
  //     .range([height, 0]);

  // x.domain([1995, 2012]);
  // y.domain([0, 30]);

  var bar = svg.selectAll(".dot")
                .data(us)
              .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 2);

  bar .attr("cx", function(d) {
        return x( d.year ); })
      .attr("cy", function(d) {
        return y( d.rate ); })
      .attr("class", function(d) {
        return quantize( d.rate ); });

  var yearFormat = d3.time.format("%Y");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ height +")")
    .call(xAxis)
  .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end")
    .text("Year");
}
