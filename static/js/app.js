const dataset =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Set up a function to initialize the page
function init() {
  // Select the dropdown
  let dropdown = d3.select("#selDataset");

  // Get the dropdown info for samples
  d3.json(dataset).then((data) => {
    let sampleName = data.names;
    sampleName.forEach((sample) => {
      dropdown.append("option").text(sample).property("value", sample);
    });
    let firstSample = sampleName[0];
    updateCharts(firstSample);
  });
}

function updateCharts(id, sample) {
  // Set up the variables
  let sampleValues = sample.sample_values;
  let otuIds = sample.otu_ids;
  let otuLabels = sample.otu_labels;

  // Update the bar chart with the top 10 OTUs found in the selected individual
  let topOtuIds = otuIds
    .slice(0, 10)
    .reverse()
    .map((otuID) => "OTU " + otuID);
  let topOtuLabels = otuLabels.slice(0, 10).reverse();
  let topSampleValues = sampleValues.slice(0, 10).reverse();

  // Set the data for the chart
  let trace1 = {
    x: topSampleValues,
    y: topOtuIds,
    text: topOtuIds,
    type: "bar",
    orientation: "h",
  };

  let data1 = [trace1];

  Plotly.newPlot("bar", data1);

  // Update the bubble chart
  // Set the data for the chart
  let trace2 = {
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: "markers",
    marker: {
      size: sampleValues,
      color: otuIds,
    },
  };

  let data2 = [trace2];

  let layout = {
    xaxis: { title: "OTU ID" },
  };

  Plotly.newPlot("bubble", data2, layout);
}

// Run the init function to set up the page
init();
