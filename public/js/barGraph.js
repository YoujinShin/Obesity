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

var state_x = 0;
var state_y = 0;
var tf = -1;

var selectedState = "Florida";

queue()
  .defer(d3.tsv, "obesity_data.tsv")
  .defer(d3.tsv, "obesity_data.tsv", function(d) {
    if(d.state === selectedState) {
      rateByState.set(d.year, +d.rate);
    }
  })
  .await(makeBar);

function makeScatter() {
  queue()
    .defer(d3.tsv, "obesity_data.tsv")
    .defer(d3.tsv, "obesity_data.tsv", function(d) {
      if(tf === -1 && stateClicked == 1) {
        if(d.state === selectedState) {
          state_x = 0;
          state_y = y(d.rate);
          tf = 1;
        }
      }
    })
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
                .attr("class", "rectDesign")
                .attr("x", x(currentYear) - 10)
                .attr("y", 10)
                .attr("width", 20)
                .attr("height", heightS-10)
                .style("fill", "rgba(0,0,0,0.0)")
                .attr("stroke-width", 1)
                .attr("stroke", "black");

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
                  tooltip.text(d.state+" - "+d.rate+"%" );
                  // this.style.stroke = "black";
                  tooltip.style("visibility", "visible");
                })
                .on("mousemove", function(){
                  tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
                .on("mouseout", function(){
                  this.style.stroke = "none";
                  tooltip.style("visibility", "hidden");});

  svgS.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ heightS +")")
    .call(xAxis);

  if(tf === 1 && stateClicked == 1) {
    var line = d3.svg.line()
      .x(function(d) { 
        if(d.state === selectedState) { state_x = x(d.year);  }
        return state_x;
      })
      .y(function(d) { 
        if(d.state === selectedState) { state_y =  y(d.rate);  }
        return state_y;
      });

    svgS.append("path")
        .datum(us)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke-dasharray", "2,4");

    tf = -1;

    svgS.append("text")
            .attr("x", 0)
            .attr("y", 55)
            .attr("font-size", "1.1em")
            .text(selectedState)
            .attr("fill", "black");
            // .attr("fill", "rgb(140,140,140)");
  }
}
