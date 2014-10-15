var width = parseInt(d3.select('#usbmiG').style('width'), 10),
  height = 400;

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

var projection = d3.geo.albersUsa()
  .scale(width*1.29)
  .translate([width*0.52, 220]);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select("#usbmiG").append("svg")
  .attr("width", width)
  .attr("height", height);

var tooltip = d3.select("body")
  .append("div")
  .attr("id", "tooltip");

queue()
  .defer(d3.json, "us-states.json") // geojson
  .await(ready);

var obesity;

function ready(error, us) {
  obesity = svg.append("g")
      .attr("class", "states")
      .selectAll("path")
        .data(us.features); // geojson

  obesity.enter().append("path")
      .attr("d", path)// for tooltip
      .on("mouseover", function(d){
        var tempText = tooltip.text(d.properties.name);
        this.style.fill = "#9cdede"
        tooltip.style("visibility", "visible");

        connectToDots(d.properties.name);
      })
      .on("mousemove", function(){
        tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
      })
      .on("mouseout", function(){
        this.style.fill = "rgba(255,255,255,0.6)";
        tooltip.style("visibility", "hidden");

        resetDots();
      });
}

function connectToDots(name) {
  svgS.selectAll("circle").each(function(e) {
    
    if(e.state==name) {
      // console.log(e.state);
      d3.select(this).style("opacity", 1);
      d3.select(this).attr("r", 6);
    }
  });
}  

function resetDots() {
  svgS.selectAll("circle").each(function(e) {
    d3.select(this).style("opacity", 1);
    d3.select(this).attr("r", 2.3);
  });
}  



