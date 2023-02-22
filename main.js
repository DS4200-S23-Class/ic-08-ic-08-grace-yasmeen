//create frame
const FRAME_HEIGHT = 500;
const FRAME_WIDTH = 450;
const MARGINS = {left:50, right:50, top:50, bottom:50};

//scale
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME1 = d3.select("#vis1")
                  .append("svg")
                    .attr("height", FRAME_HEIGHT)
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 


d3.csv("data/data.csv").then((data) => {

	 // Build plot inside of .then 
    // find max X
	const MAX_X = d3.max(data, (d) => { return (d.Category); });
	// find the max Y
	const MAX_Y = d3.max(data, (d) => { return parseInt(d.Value); });

	//domain and range
	const X_SCALE = d3.scaleBand()
					.domain(data.map(function(d) {return d.Category;}))
					.range([0, VIS_WIDTH]).padding(.25);
	const Y_SCALE = d3.scaleLinear()
					.domain([(MAX_Y+1) ,0])
					.range([0, VIS_HEIGHT]);

    // Use X_SCALE to plot bars
    FRAME1.selectAll("bars")  
        .data(data) // passed from .then  
        .enter()       
        .append("rect")  
        	.attr("x", (d) => { return X_SCALE(d.Category) + MARGINS.left; }) 
          .attr("y", (d) => {return Y_SCALE(d.Value) +  MARGINS.top;})
          .attr("class", "bar") 
          .attr("width", X_SCALE.bandwidth())
          .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE(d.Value); })

	// Add x-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + ","
			+ (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE))
			.attr("font-size", '10px');  
		
	// Add y-axis to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.right + ","
			+ (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE).ticks(10))
			.attr("font-size", '12px')

}); 
