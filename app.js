function updateMap(mtl, stops, lines) {
  let projection = d3.geoMercator().fitSize([2400, 1200], mtl);
  let geoGenerator = d3.geoPath().projection(projection);

  let map = d3.select("#content g.map").selectAll("path").data(mtl.features);
  map.join("path").attr("d", geoGenerator);

  let arrets = d3
    .select("#content g.stops")
    .selectAll("circle")
    .data(stops.features)
    .join("circle");
  arrets
    .attr("cx", function (d) {
      return projection(d.geometry.coordinates)[0];
    })
    .attr("cy", function (d) {
      return projection(d.geometry.coordinates)[1];
    })
    .attr("fill", "yellow")
    .style("opacity", 1) // Adjust the opacity as needed
    .attr("r", 1);

  let lignes = d3
    .select("#content g.lines")
    .selectAll("path")
    .data(lines.features);
  lignes.join("path").attr("d", geoGenerator);
}

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
