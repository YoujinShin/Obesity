var width = parseInt(d3.select('#usbmiG').style('width'), 10),
	height = width*0.6;

var rateByState = d3.map();

var year = 2012;

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
	.scale(width*1.1)
	.translate([width*0.55, height*0.57]);

var path = d3.geo.path()
	.projection(projection);

var svg = d3.select("#usbmiG").append("svg")
	.attr("width", width)
	.attr("height", height);

var tooltip = d3.select("body")
	.append("div")
	.attr("id", "tooltip");

var tempFile = "obesity_state_"+year+".tsv";

queue()
	.defer(d3.json, "us-states.json") // geojson
	.defer(d3.tsv, tempFile, function(d) {
		rateByState.set(d.state,+d.rate); })
	.await(ready);

var obesity;
// var click_tf = -1;

function ready(error, us) {
	// console.log(rateByState);

	obesity = svg.append("g")
			.attr("class", "states")
			.selectAll("path")
				.data(us.features); // geojson

	document.getElementById("myyear").value = year;

	obesity.enter().append("path")
				.attr("class", function(d) {
					return "rgb(180,180,180)";
				})
			.attr("class", function(d) {
				var tempData;
				tempData = quantize(rateByState.get(d.properties.name));
				return tempData;
			})
			.attr("d", path)// for tooltip
			.on("mouseover", function(d){
				var tempText;
				tempText = tooltip.text(d.properties.name+" - "+rateByState.get(d.properties.name)+"%");
				this.style.stroke = "black";
				tooltip.style("visibility", "visible");
			})
			.on("mousemove", function(){
				tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			.on("mouseout", function(){
				this.style.stroke = "white";
				tooltip.style("visibility", "hidden");})
			.on("click", function(d) {
				// this.style.stroke = "black";
				selectedState = d.properties.name;
				makeScatter();
			});
}

function change() {

	obesity.attr("class", function(d) {
			var tempData;
			tempData = quantize(rateByState.get(d.properties.name));
			return tempData;
		})
		.attr("d", path)// for tooltip
		.on("mouseover", function(d){
			var tempText;
			tempText = tooltip.text(d.properties.name+" - "+rateByState.get(d.properties.name)+"%");
			this.style.stroke = "black";
			tooltip.style("visibility", "visible");
		})
		.on("mousemove", function(){
			tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
		.on("mouseout", function(){
			this.style.stroke = "white";
			tooltip.style("visibility", "hidden");})
		.on("click", function(d) {
			// this.style.stroke = "black";
			selectedState = d.properties.name;
			makeScatter();
		});
}

function getYear() {

	year = document.getElementById("myyear").value;
	tempFile = "obesity_state_"+year+".tsv";

	makeScatter();

	queue()
		.defer(d3.tsv, tempFile, function(d) {
			rateByState.set(d.state,+d.rate); })
		.await(change);
}

function getYearLeft() {
	
	year = document.getElementById("myyear").value;
	if(year > 1995) {
		year = year - 1;
	} else {
		year = 1995;
	}

	document.getElementById("myyear").value = year;
	tempFile = "obesity_state_"+year+".tsv";

	makeScatter();

	queue()
		.defer(d3.tsv, tempFile, function(d) {
			rateByState.set(d.state,+d.rate); })
		.await(change);
}

function getYearRight() {
	// console.log("getYearRIght");
	
	year = parseInt(document.getElementById("myyear").value);

	console.log(year);
	if(year < 2012) {
		year = year + 1;
	} else {
		year = 2012;
	}

	document.getElementById("myyear").value = year;
	tempFile = "obesity_state_"+year+".tsv";

	makeScatter();

	queue()
		.defer(d3.tsv, tempFile, function(d) {
			rateByState.set(d.state,+d.rate); })
		.await(change);
}
