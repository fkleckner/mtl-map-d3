function attachToolTip() {
  var tip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  d3.selectAll("path")
    .on("mouseover", function (e, d) {
      tip
        .style("opacity", 1)
        .style("left", e.pageX + "px")
        .style("top", e.pageY + "px")
        .html(d.properties.name);
      this.style("fill", "#7F00FF");
    })
    .on("mouseout", function (d) {
      tip.style("opacity", 0);
    });
}

function updateMap(mtl, streets) {
  console.log(mtl.features.length);
  let projection = d3.geoMercator().fitSize([2400, 1200], mtl);
  let path = d3.geoPath().projection(projection);

  let map = d3.select("#content g.map").selectAll("path").data(mtl.features);

  let lignes = d3
    .select("#content g.lines")
    .selectAll("path")
    .data(streets.features);
  lignes.join("path").attr("d", path).style("stroke", "#000");
  map
    .join("path")
    .attr("d", path)
    .style("fill", "#999")
    .style("stroke", "#000");

  attachToolTip();
}

Promise.all([
  d3.json("data/neighborhood.geojson"),
  d3.json("data/geobase.json"),
]).then(function (data) {
  mtl = data[0];
  streets = data[1];
  updateMap(mtl, streets);
});
