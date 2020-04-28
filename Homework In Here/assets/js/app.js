console.log(`Hello world`); // testing the stat of the script

// Declaring the svg variable
function makeResponsive() {
    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    let svgArea = d3.select("div#scatter").append("svg");

    // Clear svg if not empty 
    if (!svgArea.empty()){
        svgArea.remove();
    }


    let svgHeight = window.innerHeight;
    let svgwidth = window.innerWidth;

    // assigning the margin
    let margin = {
        top:20,
        right: 20,
        bottom: 20,
        left: 20
    }

    // assigning the width
    let width = svgwidth - margin.left - margin.right;

    // assigning the height
    let height = svgHeight - margin.top - margin.bottom;

    // creating an svg wrapper
    let svg = d3.select("#scatter")
                .append("svg")
                .attr("width", svgwidth)
                .attr("height", svgHeight);

    // Making the chart area
    let chartGroup = svg.append("g")
                        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // initial x parameter
    let chosenXAxis = "poverty";

    function xScale(stateData, chosenXAxis){
        // creating the scales
        let xLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d[chosenXAxis])*0.8,
                d3.max(stateData, d => d[chosenXAxis])*1.2
            ])
            .range([0, width])
        return xLinearScale
    }

    // updating the x axis when clicking on a different label
    function renderAxes(newXscale, xAxis) {
        let bottomAxis = d3.axisBottom(newXscale);

        xAxis.transistion()
            .duration(500)
            .call(bottomAxis);
        
        return xAxis;
    }

    function renderCircles(circlesGroup, newXscale, chosenXaxis){
        circlesGroup.transistion()
                    .duration(500)
                    .attr("cx", d => newXscale(d[chosenXAxis]));
        
        return circlesGroup
    }

    function updateToolTip(chosenXAxis, circlesGroup) {
        if (chosenXAxis === "poverty") {
            let label = "In Poverty (%)";
        }
        else if (chosenXAxis === "age") {
            let label = "Age Median";
        }
        else {
            let label = "Income Median";
        }
        
        let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.rockband}<br>${label} ${d[chosenXAxis]}`);
        }); 

        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", (data) => {
            toolTip.show(data)
        })
        
        .on("mouseout", (data, index) => {
            toolTip.hide(data)
        });
        
        return circlesGroup;
    }

    
    // importing the data
    d3.csv("assets/data/data.csv").then((stateData, err) => {
        // Sanity checking below
        console.log(stateData);
        if (err) throw err;

        stateData.forEach( (data) => {
            // X axis

            data.poverty = +data.poverty;
            // assuming the above is a percentage
            data.age = +data.age;
            // assuming the above is a median value
            data.income = + data.income;
            // assuming the above is a median value
            
            // X axis

            // Y axis

            data.obesity = +data.obesity;
            // assuming the above is a percentage
            data.smokes = +data.smokes;
            // assuming the above is a percentage
            data.healthcare = +data.healthcare;
            // assuming the above is a percentagen
            
            // Y axis
        });

        // incorperating the csv data into the xScale function as the variable xLinearScale
        let xLinearScale = xScale(stateData, chosenXAxis);

        // creating the y scale function
        let yLinearScale = d3.scaleLinear()
                .domain([0, d3.max(stateData, d => d.healthcare)])
                .range([height, 0]);
        
        // Creating initial axis function
        let bottomAxis = d3.axisBottom(xLinearScale);
        let leftAxis = d3.axisLeft(yLinearScale);
        
        // append x axis
        let xAxis = chartGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
        
        // appending the y axis
        chartGroup.append("g")
            .call(leftAxis);

        // appending the initial circles
        let circlesGroup = chartGroup.selectAll("circles")
            .data(stateData)
            .enter()
            .append("stateData")
            .attr("cx", d => xLinearScale(d[chosenXAxis]))
            .attr("cy", d => yLinearScale(d.healthcare))
            .attr("r", 20)
            .attr("fill", "blue")
            .attr("opacity", ".5");
        
        // Createing a group for 2 x-axis labels
        let labelsGroups = chartGroup.append("g")
            .attr(("transform", `tansform(${width / 2}, ${height + 20})`));
        
        let povertyLabel = labelsGroups.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "poverty")
            .classed("active", true)
            .text("In Poverty (%)");

        let ageLabel = labelsGroups.append("text")
            .attr("x", 0 - margin.left)
            .attr("y", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "age")
            .classed("active", true)
            .text("Age (Median");

    });

}

makeResponsive()

console.log(`Hello world`); // testing at the end of the script