let mtl = {};
let stops = {};

function updateMap() {
  let projection = d3.geoEquirectangular().fitSize([800, 400], mtl);
  let geoGenerator = d3.geoPath().projection(projection);
  let context = d3
    .select("#content g.map")
    .selectAll("path")
    .data(mtl.features);

  context.enter().append("path").attr("d", geoGenerator);
}

function updateStops() {
  let svg = d3.select("#content");
  let circles = svg.append("g").selectAll("circle").data(stops.features);

  circles
    .enter()
    .append("circle")
    .attr("fill", "yellow")
    .style("opacity", 0.7) // Adjust the opacity as needed
    .attr("r", 4); // Adjust the radius as needed
}

Promise.all([
  d3.json(
    "https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/montreal.geojson"
  ),
  d3.json("stm.geojson"),
]).then(function (data) {
  console.log(data[0]);
  mtl = data[0];
  console.log(data[1]);
  stops = data[1];
  updateMap();
  updateStops();
});
