<<<<<<< HEAD
function updateMap(mtl, stops, lines) {
  let projection = d3.geoMercator().fitSize([2400, 1200], mtl);
  let geoGenerator = d3.geoPath().projection(projection);
=======
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
>>>>>>> 105227bb4d85bbb77219826ce767481ac35056dd

  let map = d3.select("#content g.map").selectAll("path").data(mtl.features);
  map.join("path").attr("d", geoGenerator);

<<<<<<< HEAD
  let arrets = d3
    .select("#content g.stops")
    .selectAll("circle")
    .data(stops.features)
    .join("circle");
  arrets
=======
function updateStops(stops) {
  let svg = d3
    .select("#content g.circles")
    .selectAll("circle")
    .data(stops.features)
    .enter()
    .append("circle");

  svg
>>>>>>> 105227bb4d85bbb77219826ce767481ac35056dd
    .attr("cx", function (d) {
      return projection(d.geometry.coordinates)[0];
    })
    .attr("cy", function (d) {
      return projection(d.geometry.coordinates)[1];
    })
    .attr("fill", "red")
    .style("opacity", 1) // Adjust the opacity as needed
    .attr("r", 1);

  let lignes = d3
    .select("#content g.lines")
    .selectAll("path")
    .data(lines.features);
  lignes.join("path").attr("d", geoGenerator);
}

<<<<<<< HEAD
Promise.all([
  d3.json("data/geobase.json"),
  d3.json("data/stm.geojson"),
  d3.json("data/stm_lines.geojson"),
]).then(function (data) {
  mtl = data[0];
  stops = data[1];
  lines = data[2];
  updateMap(mtl, stops, lines);
});
=======
Promise.all([d3.json("data/geobase.json"), d3.json("stm.geojson")]).then(
  function (data) {
    mtl = data[0];
    stops = data[1];

    updateGlobals(mtl);
    updateMap(mtl);
    updateStops(stops);
  }
);
>>>>>>> 105227bb4d85bbb77219826ce767481ac35056dd
