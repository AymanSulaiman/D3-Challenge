let svgWidth = 960;
let svgHeight = 500;

let margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
let svg = d3.select("#scatter1")
.append("svg")
.attr("width", svgWidth)
.attr("height", svgHeight);

let chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("./assets/data/data.csv").then(function(stateData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Step 2: Create scale functions
    // ==============================
    let xLinearScale = d3.scaleLinear()
        .domain([8.75, d3.max(stateData, d => d.poverty)])
        .range([0, width]);

    let yLinearScale = d3.scaleLinear()
        .domain([4, d3.max(stateData, d => d.healthcare)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    chartGroup.append("g")
        .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    let circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "#85C1E9")
        .attr("opacity", ".5");

    let circleLabels = chartGroup.selectAll(null)
        .data(stateData)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "13px")
        .attr("font-family","Helvetica");

    circleLabels
        .attr("x", (d) => {
            return xLinearScale(d.poverty);
        })
        .attr("y", (d) => {
            return yLinearScale(d.healthcare);
        })
        .text( (d) => {
            return d.abbr;
        })
        .attr("fill", "white");


    // Step 6: Initialize tool tip
    // ==============================
    let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([22, 5])
        .html(function(d) {
        return (`${d.abbr}`);
        })
        .offset([80,-60])
        .html(function(d){
            return(`${d.abbr}<hr>Poverty level: ${d.poverty}<hr>Lacks Healthcare: ${d.healthcare}`)
        });

    


    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data, this);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });


    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)", `translate(${height + margin.top})`)
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .attr("font-family","Helvetica")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .attr("font-family","Helvetica")
        .text("In Poverty (%)");
    }).catch(function(error) {
    console.log(error);
});





/*

The code below was past attempts at the Level 1


*/







/*

The stuff below works but I want to see if I can make it slightly better

*/




// let svgWidth = 960;
// let svgHeight = 500;

// let margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 100
// };

// let width = svgWidth - margin.left - margin.right;
// let height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// let svg = d3.select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// let chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Import Data
// d3.csv("./assets/data/data.csv").then(function(stateData) {

//     // Step 1: Parse Data/Cast as numbers
//     // ==============================
//     stateData.forEach(function(data) {
//       data.poverty = +data.poverty;
//       data.healthcare = +data.healthcare;
//     });

//     // Step 2: Create scale functions
//     // ==============================
//     let xLinearScale = d3.scaleLinear()
//       .domain([8.75, d3.max(stateData, d => d.poverty)])
//       .range([0, width]);

//     let yLinearScale = d3.scaleLinear()
//       .domain([0, d3.max(stateData, d => d.healthcare)])
//       .range([height, 0]);

//     // Step 3: Create axis functions
//     // ==============================
//     let bottomAxis = d3.axisBottom(xLinearScale);
//     let leftAxis = d3.axisLeft(yLinearScale);

//     // Step 4: Append Axes to the chart
//     // ==============================
//     chartGroup.append("g")
//       .attr("transform", `translate(0, ${height})`)
//       .call(bottomAxis);

//     chartGroup.append("g")
//       .call(leftAxis);

//     // Step 5: Create Circles
//     // ==============================
//     let circlesGroup = chartGroup.selectAll("circle")
//         .data(stateData)
//         .enter()
//         .append("circle")
//         .attr("cx", d => xLinearScale(d.poverty))
//         .attr("cy", d => yLinearScale(d.healthcare))
//         .attr("r", "15")
//         .attr("fill", "#85C1E9")
//         .attr("opacity", ".5");

//     let circleLabels = chartGroup.selectAll(null)
//         .data(stateData)
//         .enter()
//         .append("text")
//         .attr("text-anchor", "middle")
//         .attr("font-size", "13px")
//         .attr("font-family","Helvetica");

//     circleLabels
//         .attr("x", (d) => {
//             return xLinearScale(d.poverty);
//         })
//         .attr("y", (d) => {
//             return yLinearScale(d.healthcare);
//         })
//         .text( (d) => {
//             return d.abbr;
//         })
//         .attr("fill", "white");


//     // Step 6: Initialize tool tip
//     // ==============================
//     let toolTip = d3.tip()
//       .attr("class", "tooltip")
//       .offset([22, 5])
//       .html(function(d) {
//         return (`${d.abbr}`);
//       });

//     // Step 7: Create tooltip in the chart
//     // ==============================
//     chartGroup.call(toolTip);

//     // Step 8: Create event listeners to display and hide the tooltip
//     // ==============================
//     // circlesGroup.on("mouseover", function(data) {
//     //   toolTip.show(data, this);
//     // })
//     //   // onmouseout event
//     //   .on("mouseout", function(data, index) {
//     //     toolTip.show(data);
//     //   });

//     // Create axes labels
//     chartGroup.append("text")
//       .attr("transform", "rotate(-90)", `translate(${height + margin.top})`)
//       .attr("y", 0 - margin.left + 40)
//       .attr("x", 0 - (height / 2))
//       .attr("dy", "1em")
//       .attr("class", "axisText")
//       .text("Lacks Healthcare (%)");

//     chartGroup.append("text")
//       .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
//       .attr("class", "axisText")
//       .text("In Poverty (%)");
//   }).catch(function(error) {
//     console.log(error);
//   });










/* 

The stuff below does not work, I thought I was being clever but instead,
like most things in my life, it was repugnantly stupid

*/





// console.log(`Hello world`); // testing the stat of the script

// // Declaring the svg variable
// function makeResponsive() {
//     // if the SVG area isn't empty when the browser loads,
//     // remove it and replace it with a resized version of the chart
//     let svgArea = d3.select("div#scatter").append("svg");

//     // Clear svg if not empty 
//     if (!svgArea.empty()){
//         svgArea.remove();
//     }


//     let svgHeight = window.innerHeight;
//     let svgwidth = window.innerWidth;

//     // assigning the margin
//     let margin = {
//         top:20,
//         right: 20,
//         bottom: 20,
//         left: 20
//     }

//     // assigning the width
//     let width = svgwidth - margin.left - margin.right;

//     // assigning the height
//     let height = svgHeight - margin.top - margin.bottom;

//     // creating an svg wrapper
//     let svg = d3.select("#scatter")
//                 .append("svg")
//                 .attr("width", svgwidth)
//                 .attr("height", svgHeight);

//     // Making the chart area
//     let chartGroup = svg.append("g")
//                         .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
//     // initial x parameter
//     let chosenXAxis = "poverty";

//     function xScale(stateData, chosenXAxis){
//         // creating the scales
//         let xLinearScale = d3.scaleLinear()
//         .domain([d3.min(stateData, d => d[chosenXAxis])*0.8,
//                 d3.max(stateData, d => d[chosenXAxis])*1.2
//             ])
//             .range([0, width])
//         return xLinearScale
//     }

//     // updating the x axis when clicking on a different label
//     function renderAxes(newXscale, xAxis) {
//         let bottomAxis = d3.axisBottom(newXscale);

//         xAxis.transistion()
//             .duration(500)
//             .call(bottomAxis);
        
//         return xAxis;
//     }

//     function renderCircles(circlesGroup, newXscale, chosenXaxis){
//         circlesGroup.transistion()
//                     .duration(500)
//                     .attr("cx", d => newXscale(d[chosenXAxis]));
        
//         return circlesGroup
//     }

//     function updateToolTip(chosenXAxis, circlesGroup) {
//         if (chosenXAxis === "poverty") {
//             let label = "In Poverty (%)";
//         }
//         else if (chosenXAxis === "age") {
//             let label = "Age Median";
//         }
//         else {
//             let label = "Income Median";
//         }
        
//         let toolTip = d3.tip()
//         .attr("class", "tooltip")
//         .offset([80, -60])
//         .html(function(d) {
//             return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
//         }); 

//         circlesGroup.call(toolTip);

//         circlesGroup.on("mouseover", (data) => {
//             toolTip.show(data)
//         })
        
//         .on("mouseout", (data, index) => {
//             toolTip.hide(data)
//         });
        
//         return circlesGroup;
//     }

    
//     // importing the data
//     d3.csv("assets/data/data.csv").then((stateData, err) => {
//         // Sanity checking below
//         console.log(stateData);
//         if (err) throw err;

//         stateData.forEach( (data) => {
//             // X axis

//             data.poverty = +data.poverty;
//             // assuming the above is a percentage
//             data.age = +data.age;
//             // assuming the above is a median value
//             data.income = + data.income;
//             // assuming the above is a median value
            
//             // X axis

//             // Y axis

//             data.obesity = +data.obesity;
//             // assuming the above is a percentage
//             data.smokes = +data.smokes;
//             // assuming the above is a percentage
//             data.healthcare = +data.healthcare;
//             // assuming the above is a percentagen
            
//             // Y axis
//         });

//         // incorperating the csv data into the xScale function as the variable xLinearScale
//         let xLinearScale = xScale(stateData, chosenXAxis);

//         // creating the y scale function
//         let yLinearScale = d3.scaleLinear()
//                 .domain([0, d3.max(stateData, d => d.healthcare)])
//                 .range([height, 0]);
        
//         // Creating initial axis function
//         let bottomAxis = d3.axisBottom(xLinearScale);
//         let leftAxis = d3.axisLeft(yLinearScale);
        
//         // append x axis
//         let xAxis = chartGroup.append("g")
//             .classed("x-axis", true)
//             .attr("transform", `translate(0, ${height})`)
//             .call(bottomAxis);
        
//         // appending the y axis
//         chartGroup.append("g")
//             .call(leftAxis);

//         // appending the initial circles
//         let circlesGroup = chartGroup.selectAll("circles")
//             .data(stateData)
//             .enter()
//             .append("stateData")
//             .attr("cx", d => xLinearScale(d[chosenXAxis]))
//             .attr("cy", d => yLinearScale(d.healthcare))
//             .attr("r", 20)
//             .attr("fill", "blue")
//             .attr("opacity", ".5");
        
//         // Createing a group for 2 x-axis labels
//         let labelsGroups = chartGroup.append("g")
//             .attr(("transform", `tansform(${width / 2}, ${height + 20})`));
        
//         let povertyLabel = labelsGroups.append("text")
//             .attr("x", 0)
//             .attr("y", 20)
//             .attr("value", "poverty")
//             .classed("active", true)
//             .text("In Poverty (%)");

//         let ageLabel = labelsGroups.append("text")
//             .attr("x", 0 - margin.left)
//             .attr("y", 0 - (height / 2))
//             .attr("dy", "1em")
//             .attr("value", "age")
//             .classed("active", true)
//             .text("Age (Median");

//         // appending the y axis
//         chartGroup.append("text")
//             .attr("transform", "rotate(-90")
//             .attr("y", 0 - margin.left)
//             .attr("x", 0 - (height/2))
//             .attr("dy", "1em")
//             .classed("axis-text", true)
//             .text("Lacks Healthcare");
        
//         // updateToolTip function above csv import
//         let circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // x axis labels event listener
//         labelsGroups.selectAll("text")
//             .on("click", () => {
//                 // get value of selection
//                 let value = d3.select(this).attr("value");
//                 if (value !== chosenXAxis){
//                    // replaces chosenXAxis with value
//                    chosenXAxis = value;
                   
//                    //sanity check
//                    console.log(chosenXAxis)

//                    // functions here found above csv import
//                    // updates x scale for new data
//                    xLinearScale = xScale(stateData, chosenXAxis);
                   
//                    // updates x axis with transition
//                    xAxis = renderAxes(xLinearScale, xAxis); 
                    
//                    // updates circles wiht new x axis
//                    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//                    // updates tooltips with new info
//                    circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


//                 }
//             })


//     });

// }

// makeResponsive()

// console.log(`Hello world`); // testing at the end of the script