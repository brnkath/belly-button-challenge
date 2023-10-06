# Interactive dashboard to explore a belly button biodiversity dataset

Contributor: Brian Kath

Repository Structure - 

	- Main folder
		- README.md
		- index.html
		- samples.json
	
	- Sub-folders
		- images
			- bar_chart.png
			- bubble_chart.png
			- demo_info.png
		- static
			-js
				- .gitkeep
				- app.js


Overview - 

For this project, I used the D3 JavaScript library and Plotly to develop an interactive dashboard to explore a belly button biodiversity dataset. I first retrieved the dataset using the d3.json function from this <a href="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json" target="_blank">URL</a>. The same data is also available for reference in the samples.json file located in the main forlder of the repository. Then, using Plotly, I created a horizontal bar chart to display the top 10 OTUs (operational taxonomic units) found in the individual chosen using the dropdown menu in the upper left portion of the webpage. Below is an image of how this bar chart looks using the first sample in the dataset as an example.

<img src="images/bar_chart.png" />

My next step, was to make a bubble chart using Plotly showing the OTU ID and the sample values for the individual sample chosen using the dropdown menu. Below is an example of the bubble chart using the first sample in the dataset. The size of the bubbles are proportionate to the sample value, and the colors are adjusted based on the different OTU IDs.

<img src="images/bubble_chart.png" />

Finally, I pulled the key/value pairs for the demographic information associated with each sample out of the JSON dataset and displayed it in the Demographic Info section of the webpage. An example using the first sample in the dataset is shown below.

<img src="images/demo_info.png" />

<hr style="margin: 30px;">
<a href="https://robdunnlab.com/projects/belly-button-biodiversity/" target="_blank">Here</a> is a link to the study website.<br/>
The live dashboard is available here:
<a href="https://brnkath.github.io/belly-button-challenge/" target="_blank">brnkath.github.io/belly-button-challenge/</a>
