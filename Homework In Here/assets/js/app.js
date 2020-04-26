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
    let svg = d3.select("#scatter");


}


console.log(`Hello world`); // testing at the end of the script