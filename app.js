function updateMap(mtl) {
  let projection = d3.geoMercator().fitSize([2400, 1200], mtl);
  let geoGenerator = d3.geoPath().projection(projection);
  let context = d3
    .select("#content g.map")
    .selectAll("path")
    .data(mtl.features);

  context.join("path").attr("d", geoGenerator);
}

function updateStops(mtl, stops) {
  let projection = d3.geoMercator().fitSize([2400, 1200], mtl);
  let geoGenerator = d3.geoPath().projection(projection);
  let svg = d3
    .select("#stops g.circles")
    .selectAll("circle")
    .data(stops.features)
    .join("circle");

  svg
    .attr("cx", function (d) {
      console.log("here");
      return projection(+d.geometry.coordinates)[0];
    })
    .attr("cy", function (d) {
      console.log("here");
      return projection(+d.geometry.coordinates)[1];
    })
    .attr("fill", "yellow")
    .style("opacity", 1) // Adjust the opacity as needed
    .attr("r", 4);
}

Promise.all([d3.json("data/geobase.json"), d3.json("data/stm.geojson")]).then(
  function (data) {
    console.log(data[0]);
    mtl = data[0];
    console.log(data[1]);
    stops = data[1];
    updateMap(mtl);
    updateStops(mtl, stops);
  }
);
