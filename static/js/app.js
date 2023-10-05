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

    // Set up the first sample
    let firstSample = sampleName[0];
    updateBar(firstSample);
    updateBubble(firstSample);
    updateMeta(firstSample);
  });
}

// Run the init function to set up the page
init();

function optionChanged(newSample) {
  updateBar(newSample);
  updateBubble(newSample);
  updateMeta(newSample);
}

function updateBar(sample) {
  d3.json(dataset).then((data) => {
    let sampleData = data.samples;
    let sampleFilter = sampleData.filter((sampleObj) => sampleObj.id == sample);
    let sampleChoice = sampleFilter[0];
    let otuIds = sampleChoice.otu_ids;
    let otuLabels = sampleChoice.otu_labels;
    let sampleValues = sampleChoice.sample_values;

    let trace1 = [
      {
        x: sampleValues.slice(0, 10).reverse(),
        y: otuIds
          .slice(0, 10)
          .map((id) => `OYU ${id}`)
          .reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      },
    ];

    Plotly.newPlot("bar", trace1);
  });
}

function updateBubble(sample) {
  d3.json(dataset).then((data) => {
    let sampleData = data.samples;
    let sampleFilter = sampleData.filter((sampleObj) => sampleObj.id == sample);
    let sampleChoice = sampleFilter[0];
    let otuIds = sampleChoice.otu_ids;
    let otuLabels = sampleChoice.otu_labels;
    let sampleValues = sampleChoice.sample_values;

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
    Plotly.newPlot("bubble", trace2);
  });
}

function updateMeta(sample) {
  d3.json(dataset).then((data) => {
    let metaData = data.metadata;
    let metaFilter = metaData.filter((metaObj) => metaObj.id == sample);
    let metaChoice = metaFilter[0];
    let metaSection = d3.select("#sample-metadata");

    metaSection.html("");

    Object.entries(metaChoice).forEach(([key, value]) => {
      metaSection.append("h6").text(`${key}: ${value}`);
    });
  });
}
