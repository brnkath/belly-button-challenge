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

    // Set up the first sample to display on page load
    let firstSample = sampleName[0];
    updateBar(firstSample);
    updateBubble(firstSample);
    updateMeta(firstSample);
  });
}

// Set up the function to update all sections when a new sample is selected
function optionChanged(newSample) {
  updateBar(newSample);
  updateBubble(newSample);
  updateMeta(newSample);
}

// Update the bar chart
function updateBar(sample) {
  // Pull dataset and set up variables
  d3.json(dataset).then((data) => {
    let sampleData = data.samples;
    let sampleFilter = sampleData.filter((sampleObj) => sampleObj.id == sample);
    let sampleChoice = sampleFilter[0];
    let otuIds = sampleChoice.otu_ids;
    let otuLabels = sampleChoice.otu_labels;
    let sampleValues = sampleChoice.sample_values;

    // Set up the data for the updated plot
    let trace1 = [
      {
        x: sampleValues.slice(0, 10).reverse(),
        y: otuIds
          .slice(0, 10)
          .map((id) => `OTU ${id}`)
          .reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];

    // Update the plot
    Plotly.newPlot("bar", trace1);
  });
}

// Update bubble chart
function updateBubble(sample) {
  // Pull data and set up variables
  d3.json(dataset).then((data) => {
    let sampleData = data.samples;
    let sampleFilter = sampleData.filter((sampleObj) => sampleObj.id == sample);
    let sampleChoice = sampleFilter[0];
    let otuIds = sampleChoice.otu_ids;
    let otuLabels = sampleChoice.otu_labels;
    let sampleValues = sampleChoice.sample_values;

    // Set up the data for the updated plot
    let trace2 = [
      {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds,
        },
      },
    ];

    let layout = {
      xaxis: { title: "OTU ID" },
    };

    // Update the plot
    Plotly.newPlot("bubble", trace2, layout);
  });
}

// Update Demographic Info section
function updateMeta(sample) {
  // Pull data and set up variables
  d3.json(dataset).then((data) => {
    let metaData = data.metadata;
    let metaFilter = metaData.filter((metaObj) => metaObj.id == sample);
    let metaChoice = metaFilter[0];
    let metaSection = d3.select("#sample-metadata");

    metaSection.html("");

    // Pull and display each key/value pair
    Object.entries(metaChoice).forEach(([key, value]) => {
      metaSection.append("h6").text(`${key}: ${value}`);
    });
  });
}

// Run the init function to set up the page
init();
