
var margin = { top:30, right:60, bottom:20, left:40 };

var widthS = parseInt(d3.select('#scatterG').style('width'), 10),
    widthS = widthS - margin.left - margin.right,

    heightS = 530;
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

var state_x = 0;
var state_y = 0;
var tf = -1;

var data;

// Data Change
d3.select(".graph")
  .on("click", function(){
    svgS.selectAll("circle")
      .transition()
        .duration(430)
      .attr("cy", function(d) {
        return y(d.rate);
      });
  });

d3.select(".scatter")
  .on("click", function(){
    svgS.selectAll("circle")
      .transition()
        .duration(430)
      .attr("cy", function(d) {
        return getY(d.state);
      });
  });

queue()
  .defer(d3.tsv, "obesity_data.tsv")
  .await(makeBar);

function makeBar(error, us) {
  data = us;

  var bg = svgS.append("rect")
                .attr("x", -margin.left)
                .attr("y", -margin.top)
                .attr("width", widthS + margin.left + margin.right + 100)
                .attr("height", heightS + margin.top + margin.bottom)
                .style("fill", "none");

  us.forEach(function(d) {
    d.year = parseDate(d.year);
  });

  x.domain(d3.extent(us, function(d) {  return d.year; }));
  var extent = d3.extent(us, function(d) { return d.year; });

  var parseString = d3.format("d");
  // var currentYear = parseDate( parseString(year) );

  var bar = svgS.selectAll(".dot")
                .data(us)
              .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 3)
                .attr("cx", function(d) { return x(d.year); })
                .attr("cx", function(d) { return x(d.year); })
                .attr("cy", function(d) { 
                  // console.log(d.state);
                  return getY(d.state);
                  // return y(d.rate); 
                })
                .attr("class", function(d) { return quantize(d.rate); });

  bar.on("mouseover", function(d){
        var tempText = tooltip.text(d.state);
        // this.style.fill = "#9cdede"
        tooltip.style("visibility", "visible");

        d3.select(this).style("opacity", 1);
        d3.select(this)
          .transition()
            .duration(150)
            .attr("r", 7);

        // d3.select(this).parentNode.appendChild(this);
      })
      .on("mousemove", function(){
        tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
      })
      .on("mouseout", function(){
        tooltip.style("visibility", "hidden");

        d3.select(this).style("opacity", 0.9);
        d3.select(this)
          .transition()
            .duration(0)
            .attr("r", 3);
      });

  svgS.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,"+ heightS +")")
    .call(xAxis); 
}

function getY(d) {
  var gap = 9.2;
  if(d=='Alabama')  return 1*gap;
  else if(d=='Alaska') return 2*gap;
  else if(d=='Arizona') return 3*gap;
  else if(d=='Arkansas') return 4*gap;
  else if(d=='California') return 5*gap;
  else if(d=='Colorado') return 6*gap;
  else if(d=='Connecticut') return 7*gap;
  else if(d=='Delaware') return 8*gap;
  else if(d=='Florida') return 9*gap;
  else if(d=='Georgia') return 10*gap;
  else if(d=='Hawaii') return 11*gap;
  else if(d=='Idaho') return 12*gap;
  else if(d=='Illinois') return 13*gap;
  else if(d=='Indiana') return 14*gap;
  else if(d=='Iowa') return 15*gap;
  else if(d=='Kansas') return 16*gap;
  else if(d=='Kentucky') return 17*gap;
  else if(d=='Louisiana') return 18*gap;
  else if(d=='Maine') return 19*gap;
  else if(d=='Maryland') return 20*gap;
  else if(d=='Massachusetts') return 21*gap;
  else if(d=='Michigan') return 22*gap;
  else if(d=='Minnesota') return 23*gap;
  else if(d=='Mississippi') return 24*gap;
  else if(d=='Missouri') return 25*gap;
  else if(d=='Montana') return 26*gap;
  else if(d=='Nebraska') return 27*gap;
  else if(d=='Nevada') return 28*gap;
  else if(d=='New Hampshire') return 29*gap;
  else if(d=='New Jersey') return 30*gap;
  else if(d=='New Mexico') return 31*gap;
  else if(d=='New York') return 32*gap;
  else if(d=='North Carolina') return 33*gap;
  else if(d=='North Dakota') return 34*gap;
  else if(d=='Ohio') return 35*gap;
  else if(d=='Oklahoma') return 36*gap;
  else if(d=='Oregon') return 37*gap;
  else if(d=='Pennsylvania') return 38*gap;
  else if(d=='Rhode Island') return 39*gap;
  else if(d=='South Carolina') return 40*gap;
  else if(d=='South Dakota') return 41*gap;
  else if(d=='Tennessee') return 42*gap;
  else if(d=='Texas') return 43*gap;
  else if(d=='Vermont') return 44*gap;
  else if(d=='Virginia') return 45*gap;
  else if(d=='Washington') return 46*gap;
  else if(d=='West Virginia') return 47*gap;
  else if(d=='Wisconsin') return 48*gap;
  else if(d=='Wyoming') return 49*gap;
  else return -100;
}

// d3.selection.prototype.moveToFront = function() {
//   return this.each(function(){
//   this.parentNode.appendChild(this);
//   });
// };
