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
        .style("left", "70%")
        .style("top", "20%")
        .html(d.properties.name);
    })
    .on("mouseout", function (d) {
      tip.style("opacity", 0);
    });
}

function updateMap(mtl, streets) {
  let projection = d3.geoMercator().fitSize([2400, 1200], mtl);
  let path = d3.geoPath().projection(projection);

  let map = d3.select("#content g.map").selectAll("path").data(mtl.features);

  // let lignes = d3
  //   .select("#content g.lines")
  //   .selectAll("path")
  //   .data(streets.features);
  // lignes.join("path").attr("d", path).style("stroke", "#000");
  map.join("path").attr("d", path);
  // .style("fill", "#999")
  // .style("stroke", "#000");

  let loc = [-73.57954, 45.5081];
  var sym = d3.symbol().type(d3.symbolStar).size(300);
  let star = d3
    .select("#content g.stops")
    .append("path")
    .attr(
      "transform",
      "translate(" + projection(loc)[0] + "," + projection(loc)[1] + ")"
    );

  star.attr("d", sym).attr("fill", "#FFD700");

  var starTip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
  d3.select("#content g.stops")
    .on("mouseover", function (e, d) {
      starTip
        .style("opacity", 1)
        .style("left", e.pageX + "px")
        .style("top", e.pageY + "px")
        .html("CKUT Station!");
    })
    .on("mouseout", function (d) {
      starTip.style("opacity", 0);
    });
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
