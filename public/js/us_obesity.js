// var width = 600;
var width = parseInt(d3.select('#usbmiG').style('width'), 10),
	height = width/2 + 20;

var rateById = d3.map();
var rateByState = d3.map();

// var quantize = d3.scale.quantize()
// 	// .domain([0, .15])
// 	.domain([20, 35])
// 	.range(d3.range(4).map(function(i) { return "q"+i+"-9"}));

function quantize(t) {
	var bmiStatus;
	if(t <= 18.5) {
		bmiStatus = "q0-9";//"Underweight";
	} else if(t > 18.5 && t <= 25) {
		bmiStatus = "q1-9";//"Normal status";
  	} else if(t > 25 && t < 30) {
    	bmiStatus = "q2-9";//"Overweight";
  	} else if(t >= 30) {
    	bmiStatus = "q3-9";//"Obesity";
  	}	
  	return bmiStatus;
}

var projection = d3.geo.albersUsa()
	.scale(width)
	.translate([width/2, height/2]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("#usbmiG").append("svg")
	.attr("width", width)
	.attr("height", height);

// var color = d3.scale.category20().domain(d3.range(4));

// var legend = svg.append("g")
//     .attr("class", "legend")
//     .attr("transform", "translate(" + ((width - color.domain().length * 24) / 2) + ",30)")
//     .style("cursor", "pointer")
//   .selectAll("rect")
//     .data(color.domain())
//   .enter().append("rect")
//     .attr("x", function(d) { return d * 24; })
//     .attr("width", 24 - 14)
//     .attr("height", 24 - 14)
//     .style("fill", color);

var tooltip = d3.select("body")
	.append("div")
	.attr("id", "tooltip");

queue()
	// .defer(d3.json, "us.json") // topojson
	.defer(d3.json, "us-states.json") // geojson
	.defer(d3.tsv, "temp.tsv", function(d) {
		rateById.set(d.id, +d.rate);
	})
	.defer(d3.tsv, "obesity_state_2011.tsv", function(d) {
		rateByState.set(d.state, +d.rate);
	})
	.await(ready);

function ready(error, us) {

	svg.append("g")
			.attr("class", "states")
		.selectAll("path")
			// .data(topojson.feature(us, us.objects.states).features) // topojson
			.data(us.features) // geojson		
		.enter().append("path")
			.attr("class", function(d) {
				// return quantize(rateById.get(d.id));
				return quantize(rateByState.get(d.properties.name));
			})
			.attr("d", path)
			// for tooltip
	    .on("mouseover", function(d){
	      	// tooltip.text(d.properties.name+": " + rateById.get(d.id) );
	      	tooltip.text(d.properties.name+": " + rateByState.get(d.properties.name) );  	
	      	this.style.stroke = "black"; 
	      	// d3.select(this).style('stroke','#000');
	      	// d3.select(this).style('stroke-width','2px');
	      	tooltip.style("visibility", "visible");
	    })
	    .on("mousemove", function(){
	      tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	    .on("mouseout", function(){
	    	this.style.stroke = "white"; 
	      // d3.select(this).style('stroke-width','1px');
	      // d3.select(this).style('stroke','#fff');
	      tooltip.style("visibility", "hidden");});
}
