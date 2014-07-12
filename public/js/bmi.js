var margin = {top: 24, right: 0, bottom: 8, left: 0},
    width2 = parseInt(d3.select('#mybmiG').style('width'), 10),
    width2 = width2 - margin.left - margin.right,
    height2 = 68 - margin.top - margin.bottom;
    // width = 220 - margin.left - margin.right,
    // height = 50 - margin.top - margin.bottom;


var svg2 = d3.select("#mybmiG").append("svg")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var maxWidth = 50;
drawrect();

var bmiStatus;
var bmiValue;


function getBMI() {
  var temph = document.getElementById("myheight").value;
  var tempw = document.getElementById("myweight").value;
  var tempbmi = d3.format(".2f")(tempw/(temph * temph / 10000));

  tempbmi = Math.max(0, Math.min(tempbmi, maxWidth));
  bmiValue = tempbmi;

  // document.getElementById("mybmi").value = tempbmi;

  drawrect();
  showText(tempbmi);
  drawLine(tempbmi);
}


function stateLine(t) {
  drawrect();

  var sBMI = rateByState.get(t.properties.name);
  var sName = t.properties.name;

  var txScale = d3.scale.linear()
                  .domain([0, maxWidth])
                  .range([0, width2]);

    var tx = txScale( Math.max(0+0.0, Math.min(maxWidth-0.0, sBMI)) );
    if(tx === "NaN") {
      tx = 0;
    }

    var bmiline = svg2.append("image")
         .attr('x',tx-7)
         .attr('y',-18)
         .attr('width', 14)
         .attr('height', 14)
         .attr("xlink:href","/img/t_black.png");

    var textline = svg2.append("text")
         .attr("x", tx + 11)
         .attr("y", -6)
         .attr("font-size", "0.82em")
         .text(sName)
         .attr("fill", "black");
}


function showText(t) {
  // var bmiStatus;
  if(t <= 18.5) {
    bmiStatus = "Underweight";
  } else if(t > 18.5 && t <= 25) {
    bmiStatus = "Normal status";
  } else if(t > 25 && t < 30) {
    bmiStatus = "Overweight";
  } else if(t >= 30) {
    bmiStatus = "Obesity";
  }
  // document.getElementById("mybmiStatus").innerHTML  = ">> You are in " + bmiStatus;
}

function drawLine(t) {
  var txScale = d3.scale.linear()
                  .domain([0, maxWidth])
                  .range([0, width2]);

    var tx = txScale( Math.max(0+0.0, Math.min(maxWidth-0.0, t)) );
    if(tx === "NaN") {
      tx = 0;
    }

    var bmiline = svg2.append("image")
         .attr('x',tx-7)
         .attr('y',-18)
         .attr('width', 14)
         .attr('height', 14)
         .attr("xlink:href","/img/t_black.png");

    var textline = svg2.append("text")
         .attr("x", tx + 14)
         .attr("y", -10)
         .attr("font-size", "0.9em")
         .text("Your BMI: "+bmiValue)
         .attr("fill", "black");
}


function drawrect() {
  var tempScale = d3.scale.linear()
                  .domain([0, maxWidth])
                  .range([0, width2]);

  var x1 = tempScale(18.5);
  var x2 = tempScale(25);
  var x3 = tempScale(30);
  var x4 = tempScale(50);

  var g = 0;
  var h2 = 0;
  var h = 2;

  var bg = svg2.append("rect")
                  .attr("x", - margin.left)
                  .attr("y", - margin.top)
                  .attr("width", width2 )
                  .attr("height", 100 )
                  .style("fill", "white")
                  .attr("stroke", "none");

  // under weight
  var underw = svg2
                .append("rect")
                  .attr("x", 0)
                  .attr("y", h2+g)
                  .attr("width", x1)
                  .attr("height", h)
                  // .style("fill", "#b1ddff")
                  .style("fill", "rgb(220,220,220)")
                // .append("line")
                  .attr("stroke-width", 1)
                  .attr("stroke", "white");

  var textu = svg2.append("text")
                  .attr("x", 0)
                  .attr("y", 20)
                  .attr("font-size", "0.82em")
                  .text("Underweight")
                  .attr("fill", "grey");

  // normal status
  var normalw = svg2.append("rect")
                  .attr("x", x1)
                  .attr("y", h2+g)
                  .attr("width", x2-x1)
                  .attr("height", h)
                  // .style("fill", "#0092ff")
                  .style("fill", "rgb(100,100,100)")
                  .attr("stroke-width", 1)
                  .attr("stroke", "white");

  var textn = svg2.append("text")
                  .attr("x", x1)
                  .attr("y", 20)
                  .attr("font-size", "0.82em")
                  .text("Normal")
                  .attr("fill", "grey");
  // over weight
  var overw = svg2.append("rect")
                  .attr("x", x2)
                  .attr("y", h2+g)
                  .attr("width", x3-x2)
                  .attr("height", h)
                  .style("fill", "rgb(220,220,220)")
                  // .style("fill", "#ffd3b1")//#0092ff")
                  .attr("stroke-width", 1)
                  .attr("stroke", "white");

  var textow = svg2.append("text")
                  .attr("x", x2)
                  .attr("y", 20)
                  .attr("font-size", "0.82em")
                  .text("Overweight")
                  .attr("fill", "grey");
  // obesity
  var obesityw = svg2.append("rect")
                  .attr("x", x3)
                  .attr("y", h2+g)
                  .attr("width", x4-x3)
                  .attr("height", h)
                  .style("fill", "rgb(100,100,100)")
                  // .style("fill", "#ff6d00")//"#ff0f00")
                  .attr("stroke-width", 1)
                  .attr("stroke", "white");

  var texto = svg2.append("text")
                  .attr("x", x3)
                  .attr("y", 20)
                  .attr("font-size", "0.82em")
                  .text("Obesity")
                  .attr("fill", "grey");

  // range
  var text_min = svg2.append("text")
                  .attr("x", 0)
                  .attr("y", -10)
                  .attr("font-size", "0.82em")
                  .text("0")
                  .attr("fill", "grey");

  var text_max = svg2.append("text")
                  .attr("x", x4-15)
                  .attr("y", -10)
                  .attr("font-size", "0.82em")
                  .text("50")
                  .attr("fill", "grey");
}
