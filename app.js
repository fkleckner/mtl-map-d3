// get window size
var w = window.innerWidth;
var h = window.innerHeight;

// dynamically allocate svg width and height
d3.select("#content svg").attr("width", w).attr("height", h);

function updateMap(mtl) {
  let projection = d3.geoMercator().fitSize([w, h], mtl);
  let geoGenerator = d3.geoPath().projection(projection);
  let context = d3
    .select("#content g.map")
    .selectAll("path")
    .data(mtl.features);

  context.join("path").attr("d", geoGenerator);
}

function createTestCircle() {
  let svg = d3.select("#stops g.circles").append("circle");
  svg.attr("cx", 100).attr("cy", 100).attr("fill", "yellow").attr("r", 50);
}

function updateStops(mtl, stops) {
  let projection = d3.geoMercator().fitSize([w, h], mtl);
  let geoGenerator = d3.geoPath().projection(projection);
  let svg = d3
    .select("#stops g.circles")
    .selectAll("circle")
    .data(stops.features)
    .enter()
    .append("circle");

  svg
    .attr("cx", function (d) {
      return projection(d.geometry.coordinates)[0];
    })
    .attr("cy", function (d) {
      return projection(d.geometry.coordinates)[1];
    })
    .attr("fill", "yellow")
    .style("opacity", 1) // Adjust the opacity as needed
    .attr("r", 4);
}

Promise.all([d3.json("data/geobase.json"), d3.json("stm.geojson")]).then(
  function (data) {
    console.log(data[0]);
    mtl = data[0];
    console.log(data[1]);
    stops = data[1];
    updateMap(mtl);
    //updateStops(mtl, stops);
    createTestCircle();
  }
);
