// get window size
var w = window.innerWidth;
var h = window.innerHeight;

// dynamically allocate svg width and height
d3.select("#content svg").attr("width", w).attr("height", h);

let projection;
let geoGenerator;

function updateGlobals(mtl) {
  projection = d3.geoMercator().fitSize([w, h], mtl);
  geoGenerator = d3.geoPath().projection(projection);
}

function updateMap(mtl) {
  let context = d3
    .select("#content g.map")
    .selectAll("path")
    .data(mtl.features);

  context.join("path").attr("d", geoGenerator);
}

function updateStops(stops) {
  let svg = d3
    .select("#content g.circles")
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
    .attr("fill", "red")
    .style("opacity", 1) // Adjust the opacity as needed
    .attr("r", 4);
}

Promise.all([d3.json("data/geobase.json"), d3.json("stm.geojson")]).then(
  function (data) {
    mtl = data[0];
    stops = data[1];

    updateGlobals(mtl);
    updateMap(mtl);
    updateStops(stops);
  }
);
