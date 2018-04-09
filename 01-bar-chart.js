// the dataset, a JavaScript array:
var dataset = [5, 10, 15, 20, 45, 37, 60, 55];
var element = document.getElementById("d3_svg_bar");
element.innerHTML = "<p>Initial data array: " + dataset.join('/') + "</p>";

//Width and height of the SVG chart
var w = 480;
var h = 300;
//Create SVG element:
var svg = d3.select("#d3_svg_bar")
	.append("svg") // creates an svg element in the HTML document
	.attr("width", w) // width of the entire svg graphic
	.attr("height", h); // height of the entire svg graphic

svg.selectAll("rect") // This selects all d3 rect elements
	/* Other basic d3 shapes:
	circle, line, ellipse, path, polygon, text, polyline
	*/
	.data(dataset) // “bind” your data to the type of DOM element you specified in selectAll()
	.enter() // the .enter() command matches the selectAll statement with the number of elements in the array/object
	.append("rect") // The .append() command determines which of the SVG basic shapes you’ll use.
	//.attr("class", "bars")
	.attr("x", function(d, i) { // accessing the attribute x (-axis)
		return i * (w / dataset.length);
		})
	.attr("y", function(d) {
		return h - (d * 4); //Height minus data value: “the top” of each bar in relationship to the top of the SVG!
		})
	.attr("width", 20) // fixed width of all bars
	.attr("height", function(d) {
		return d * 4;
		})
    .attr("fill", "url(#gradient)"); // applying the gradient (see below!) to the fill of the bars!;
///////////////////////
// Some D3 styling: //
/////////////////////
// 1. Adding the data as text to the bars
svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length) + (w / dataset.length) / 7.5;
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4) + 10;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");
		
//////////////////////////////////
// 2. Linear gradient
var defs = svg.append("defs"); // Step 1: Append the ‘def(inition)s’ and the gradient to the svg
var gradient = defs.append( 'linearGradient' ) // Step 2 is to append a linear gradient and it's specifications to the defs
				   .attr( 'id', 'gradient' ) // Step 3 is to define the unique gradient id
				   // creating a vertical linear gradient
				   .attr( 'x1', '0%' )
				   .attr( 'x2', '0%' )
				   .attr( 'y1', '0%' )
				   .attr( 'y2', '100%' );
gradient.append( 'stop' )
					.attr( 'class', 'start' )
					.attr( 'offset', '0%' )
					.attr("stop-color", "steelblue")
   					.attr("stop-opacity", 1);
gradient.append( 'stop' )
					.attr( 'class', 'end' )
					.attr( 'offset', '100%' )
					.attr("stop-color", "red")
   					.attr("stop-opacity", 1);
//////////////////////////////////
d3.select("#d3_svg_bar")
	.append("p")
	.text("A SVG bar chart with linear gradient.");