// var width = 600;
var width = parseInt(d3.select('#usbmiG').style('width'), 10),
	height = width*0.6;

var rateByState_1995 = d3.map();
var rateByState_1996 = d3.map();
var rateByState_1997 = d3.map();
var rateByState_1998 = d3.map();
var rateByState_1999 = d3.map();

var rateByState_2000 = d3.map();
var rateByState_2001 = d3.map();
var rateByState_2002 = d3.map();
var rateByState_2003 = d3.map();
var rateByState_2004 = d3.map();
var rateByState_2005 = d3.map();
var rateByState_2006 = d3.map();
var rateByState_2007 = d3.map();
var rateByState_2008 = d3.map();
var rateByState_2009 = d3.map();

var rateByState_2010 = d3.map();
var rateByState_2011 = d3.map();
var rateByState_2012 = d3.map();

var year = 2011;

var clicked = 0 ;

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
	.scale(width*1.2)
	.translate([width*0.5, height/2+15]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("#usbmiG").append("svg")
	.attr("width", width)
	.attr("height", height);

var tooltip = d3.select("body")
	.append("div")
	.attr("id", "tooltip");

queue()
	// .defer(d3.json, "us.json") // topojson
	.defer(d3.json, "us-states.json") // geojson

	.defer(d3.tsv, "obesity_state_1995.tsv", function(d) { rateByState_1995.set(d.state,+d._1995); })
	.defer(d3.tsv, "obesity_state_1996.tsv", function(d) { rateByState_1996.set(d.state,+d._1996); })
	.defer(d3.tsv, "obesity_state_1997.tsv", function(d) { rateByState_1997.set(d.state,+d._1997); })
	.defer(d3.tsv, "obesity_state_1998.tsv", function(d) { rateByState_1998.set(d.state,+d._1998); })
	.defer(d3.tsv, "obesity_state_1999.tsv", function(d) { rateByState_1999.set(d.state,+d._1999); })

	.defer(d3.tsv, "obesity_state_2000.tsv", function(d) { rateByState_2000.set(d.state,+d._2000); })
	.defer(d3.tsv, "obesity_state_2001.tsv", function(d) { rateByState_2001.set(d.state,+d._2001); })
	.defer(d3.tsv, "obesity_state_2002.tsv", function(d) { rateByState_2002.set(d.state,+d._2002); })
	.defer(d3.tsv, "obesity_state_2003.tsv", function(d) { rateByState_2003.set(d.state,+d._2003); })
	.defer(d3.tsv, "obesity_state_2004.tsv", function(d) { rateByState_2004.set(d.state,+d._2004); })
	
	.defer(d3.tsv, "obesity_state_2005.tsv", function(d) { rateByState_2005.set(d.state,+d._2005); })
	.defer(d3.tsv, "obesity_state_2006.tsv", function(d) { rateByState_2006.set(d.state,+d._2006); })
	.defer(d3.tsv, "obesity_state_2007.tsv", function(d) { rateByState_2007.set(d.state,+d._2007); })
	.defer(d3.tsv, "obesity_state_2008.tsv", function(d) { rateByState_2008.set(d.state,+d._2008); })
	.defer(d3.tsv, "obesity_state_2009.tsv", function(d) { rateByState_2009.set(d.state,+d._2009); })

	.defer(d3.tsv, "obesity_state_2010.tsv", function(d) { rateByState_2010.set(d.state,+d._2010); })
	.defer(d3.tsv, "obesity_state_2011.tsv", function(d) { rateByState_2011.set(d.state,+d._2011); })
	.defer(d3.tsv, "obesity_state_2012.tsv", function(d) { rateByState_2012.set(d.state,+d._2012); })
	.await(ready);

function ready(error, us) {
	console.log("ready");
	console.log(year);

	// if(clicked === 1) {
	//  	var svg = d3.select("#usbmiG").append("svg")
	// 	.attr("width", width)
	// 	.attr("height", height);
	// }

	svg.append("g")
			.attr("class", "states")
		.selectAll("path")
			// .data(topojson.feature(us, us.objects.states).features) // topojson
			.data(us.features) // geojson		
		.enter().append("path")
			.attr("class", function(d) {
				return "rgb(180,180,180)";
			})
			.attr("class", function(d) {
				var tempData;
				// var tempYear = "rateByState_"+year;
				// console.log(tempYear);
				// tempData = quantize(tempYear.get(d.properties.name));
				if(year === 1995) tempData = quantize(rateByState_1995.get(d.properties.name));
				if(year === 1996) tempData = quantize(rateByState_1996.get(d.properties.name));
				if(year === 1997) tempData = quantize(rateByState_1997.get(d.properties.name));
				if(year === 1998) tempData = quantize(rateByState_1998.get(d.properties.name));
				if(year === 1999) tempData = quantize(rateByState_1999.get(d.properties.name));

				if(year === 2000) tempData = quantize(rateByState_2000.get(d.properties.name));
				if(year === 2001) tempData = quantize(rateByState_2001.get(d.properties.name));
				if(year === 2002) tempData = quantize(rateByState_2002.get(d.properties.name));
				if(year === 2003) tempData = quantize(rateByState_2003.get(d.properties.name));
				if(year === 2004) tempData = quantize(rateByState_2004.get(d.properties.name));

				if(year === 2005) tempData = quantize(rateByState_2005.get(d.properties.name));
				if(year === 2006) tempData = quantize(rateByState_2006.get(d.properties.name));
				if(year === 2007) tempData = quantize(rateByState_2007.get(d.properties.name));
				if(year === 2008) tempData = quantize(rateByState_2008.get(d.properties.name));
				if(year === 2009) tempData = quantize(rateByState_2009.get(d.properties.name));

				if(year === 2010) tempData = quantize(rateByState_2010.get(d.properties.name));
				if(year === 2011) tempData = quantize(rateByState_2011.get(d.properties.name));
				if(year === 2012) tempData = quantize(rateByState_2012.get(d.properties.name));
				
				return tempData;
			})
			.attr("d", path)// for tooltip
			.on("mouseover", function(d){
				var tempText;

				if(year === 1995) tempText = tooltip.text(d.properties.name+" - "+rateByState_1995.get(d.properties.name)+"%");
				if(year === 1996) tempText = tooltip.text(d.properties.name+" - "+rateByState_1996.get(d.properties.name)+"%");
				if(year === 1997) tempText = tooltip.text(d.properties.name+" - "+rateByState_1997.get(d.properties.name)+"%");
				if(year === 1998) tempText = tooltip.text(d.properties.name+" - "+rateByState_1998.get(d.properties.name)+"%");
				if(year === 1999) tempText = tooltip.text(d.properties.name+" - "+rateByState_1999.get(d.properties.name)+"%");

				if(year === 2000) tempText = tooltip.text(d.properties.name+" - "+rateByState_2000.get(d.properties.name)+"%");
				if(year === 2001) tempText = tooltip.text(d.properties.name+" - "+rateByState_2001.get(d.properties.name)+"%");
				if(year === 2002) tempText = tooltip.text(d.properties.name+" - "+rateByState_2002.get(d.properties.name)+"%");
				if(year === 2003) tempText = tooltip.text(d.properties.name+" - "+rateByState_2003.get(d.properties.name)+"%");
				if(year === 2004) tempText = tooltip.text(d.properties.name+" - "+rateByState_2004.get(d.properties.name)+"%");

				if(year === 2005) tempText = tooltip.text(d.properties.name+" - "+rateByState_2005.get(d.properties.name)+"%");
				if(year === 2006) tempText = tooltip.text(d.properties.name+" - "+rateByState_2006.get(d.properties.name)+"%");
				if(year === 2007) tempText = tooltip.text(d.properties.name+" - "+rateByState_2007.get(d.properties.name)+"%");
				if(year === 2008) tempText = tooltip.text(d.properties.name+" - "+rateByState_2008.get(d.properties.name)+"%");
				if(year === 2009) tempText = tooltip.text(d.properties.name+" - "+rateByState_2009.get(d.properties.name)+"%");

				if(year === 2010) tempText = tooltip.text(d.properties.name+" - "+rateByState_2010.get(d.properties.name)+"%");
				if(year === 2011) tempText = tooltip.text(d.properties.name+" - "+rateByState_2011.get(d.properties.name)+"%");
				if(year === 2012) tempText = tooltip.text(d.properties.name+" - "+rateByState_2012.get(d.properties.name)+"%");

				this.style.stroke = "black";
				tooltip.style("visibility", "visible");
			})
			.on("mousemove", function(){
				tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){
				this.style.stroke = "white";
				tooltip.style("visibility", "hidden");})
			.on("click", function(d) {

			});

	// var text_year = svg.append("text")
 //          .attr("x", width/2-40)
 //          .attr("y", 40)
 //          .attr("font-size", "2.4em")
 //          .text(year)
 //          .attr("fill", "black");
}

function getYear() {
	year = document.getElementById("myyear").value;
	// console.log(year);

	d3.select("svg")
       .remove();

     clicked = 1;

	queue()
		.defer(d3.json, "us-states.json") 
		.defer(d3.tsv, "obesity_state_1995.tsv", function(d) { rateByState_1995.set(d.state,+d._1995); })
		.await(ready);
}
