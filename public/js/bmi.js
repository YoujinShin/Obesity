var margin = {top: 10, right: 0, bottom: 10, left: 0},
    width = 220 - margin.left - margin.right,
    height = 50 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// var maxw = 50;
var maxWidth = 50;
drawrect();



function getBMI() {
  var temph = document.getElementById("myheight").value;
  var tempw = document.getElementById("myweight").value;
  var tempbmi = d3.format(".2f")(tempw/(temph * temph / 10000));

  tempbmi = Math.max(0, Math.min(tempbmi, maxWidth));
  // console.log(tempbmi);

  document.getElementById("mybmi").value = tempbmi;

  drawrect();
  drawLine(tempbmi);
  showText(tempbmi);
}

function showText(t) {
  var bmiStatus;
  if(t <= 18.5) {
    bmiStatus = "Underweight";
  } else if(t > 18.5 && t <= 25) {
    bmiStatus = "Normal status";
  } else if(t > 25 && t < 30) {
    bmiStatus = "Overweight";
  } else if(t >= 30) {
    bmiStatus = "Obesity";
  }
  document.getElementById("mybmiStatus").innerHTML  = bmiStatus;
}

function drawLine(t) {
  var txScale = d3.scale.linear()
                  .domain([0, maxWidth])
                  .range([0, width]);

    var tx = txScale( Math.max(0+0.0, Math.min(maxWidth-0.0, t)) );


    var bmiline = svg.append("line")
      .attr("x1", tx)
      .attr("x2", tx)
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#000")
      .attr("stroke-width", 1)
      .style("opacity", 1);
  
}

function drawrect() {
  var tempScale = d3.scale.linear()
                  .domain([0, maxWidth])
                  .range([0, width]);

  var x1 = tempScale(18.5);
  var x2 = tempScale(25);
  var x3 = tempScale(30);
  var x4 = tempScale(50);

  var g = 0;

  var h2 = 0;
  var h = 30;

  var underw = svg
                .append("rect")
                  .attr("x", 0)
                  .attr("y", h2+g)
                  .attr("width", x1)
                  .attr("height", h)
                  .style("fill", "#8dd4ff")
                // .append("line")
                  .attr("stroke-width", 2)
                  .attr("stroke", "white");

  var normalw = svg.append("rect")
                  .attr("x", x1)
                  .attr("y", h2+g)
                  .attr("width", x2-x1)
                  .attr("height", h)
                  .style("fill", "#0092ff")
                  .attr("stroke-width", 2)
                  .attr("stroke", "white");

  var overw = svg.append("rect")
                  .attr("x", x2)
                  .attr("y", h2+g)
                  .attr("width", x3-x2)
                  .attr("height", h)
                  .style("fill", "#ffb5b3")
                  .attr("stroke-width", 2)
                  .attr("stroke", "white");

  var obesityw = svg.append("rect")
                  .attr("x", x3)
                  .attr("y", h2+g)
                  .attr("width", x4-x3)
                  .attr("height", h)
                  .style("fill", "#ff0f00")
                  .attr("stroke-width", 2)
                  .attr("stroke", "white");
}


// $( document ).ready(function() {
//   $('input[id="myheight"]').change(function(){
//     console.log( document.getElementById('myheight').value );
//   });
// });