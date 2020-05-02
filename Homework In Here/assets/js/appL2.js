// I am not longer incorperating Level 2 into the homework for it is not worth my quarantined time


// let svgWidth = 960;
// let svgHeight = 500;

// let margin = {
//   top: 20,
//   right: 40,
//   bottom: 80,
//   left: 100
// };

// let width = svgWidth - margin.left - margin.right;
// let height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// let svg = d3
//   .select("#scatter2")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// // Append an SVG group
// let chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params
// let chosenXAxis = "poverty";

// // function used for updating x-scale let upon click on axis label
// function xScale(stateData, chosenXAxis) {
//   // create scales
//   let xLinearScale = d3.scaleLinear()
//     .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.8,
//       d3.max(stateData, d => d[chosenXAxis]) * 1.2
//     ])
//     .range([0, width]);

//   return xLinearScale;

// }

// // function used for updating xAxis let upon click on axis label
// function renderAxes(newXScale, xAxis) {
//   let bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCircles(circlesGroup, newXScale, chosenXaxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));

//   return circlesGroup;
// }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, circlesGroup) {

//   if (chosenXAxis === "poverty") {
//     let label = "Hair Length:";
//   }
//   else {
//     let label = "# of Albums:";
//   }

//   let toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }

// // Retrieve data from the CSV file and execute everything below
// d3.csv("./assets/data/data.csv").then(function(stateData, err) {
//   if (err) throw err;

//   // parse data
//   stateData.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.num_hits = +data.num_hits;
//     data.num_albums = +data.num_albums;
//   });

//   // xLinearScale function above csv import
//   let xLinearScale = xScale(stateData, chosenXAxis);

//   // Create y scale function
//   let yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(stateData, d => d.num_hits)])
//     .range([height, 0]);

//   // Create initial axis functions
//   let bottomAxis = d3.axisBottom(xLinearScale);
//   let leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   let xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   let circlesGroup = chartGroup.selectAll("circle")
//     .data(stateData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.num_hits))
//     .attr("r", 20)
//     .attr("fill", "pink")
//     .attr("opacity", ".5");

//   // Create group for  2 x- axis labels
//   let labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   let hairLengthLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "hair_length") // value to grab for event listener
//     .classed("active", true)
//     .text("Hair Metal Ban Hair Length (inches)");

//   let albumsLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "num_albums") // value to grab for event listener
//     .classed("inactive", true)
//     .text("# of Albums Released");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Number of Billboard 500 Hits");

//   // updateToolTip function above csv import
//   let circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       let value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;
//         // sanity checking
//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(stateData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "num_albums") {
//           albumsLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           hairLengthLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           albumsLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           hairLengthLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// }).catch(function(error) {
//   console.log(error);
// });
