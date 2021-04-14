import React from "react";
import Papa from "papaparse";

class FileSelect extends React.Component {
  componentDidMount(){
    this.fileSelector = document.createElement("input");
    this.fileSelector.setAttribute("type", "file");
    this.fileSelector.setAttribute( "accept", ".csv");
    this.fileSelector.addEventListener("change", e => {
      loadCSV(e, this.props.addItem, this.format);
    });
  }
  
  handleFileSelect = (e) => {
    if (e.target.value === "DEFAULT") return;
    this.format = e.target.value;
    this.fileSelector.click();
    e.target.value = "DEFAULT";
  }
  
  render(){
    return(
      <select onChange={this.handleFileSelect} defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled hidden>Add</option>
        <option value="tek">Tektronix</option>
        <option value="custom">Custom</option>
      </select>
    )
  }
}

function loadCSV(event, callback, format) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', event => {
    console.log("Loading CSV into array...");
    let csv = Papa.parse(event.target.result, { skipEmptyLines: true }).data;
    console.log("Parsing CSV array...")
    if (format === "tek") callback(parseOldTek(csv));
    else if (format === "custom") callback(parseCustom(csv));
    
  });
  reader.readAsText(file);
}

function parseOldTek(csv) {
  const step = Number(csv[1][1]);
  const nPoints = Number(csv[0][1]);
  const name = csv[4][0];
  const data = []
  for (let i = 0; i < nPoints; i++) {
    data.push(Number(csv[i][4]));
  }
  return {
    name: name, 
    yData: data, 
    step: step, 
    color: getRandomColor(0, 155),
    offset: 0
  };
}

function parseCustom(csv) {
  const xData = [];
  const yData = [];
  csv.forEach(line => {
    xData.push(Number(line[0]));
    yData.push(Number(line[1]));
  });
  return {
    name: "Custom",
    xData: xData,
    yData: yData,
    color: getRandomColor(0, 155),
    offset: 0
  }
}

// Generate random Hex color codes with given min/max rgb values
export function getRandomColor(min, max) {
  let r = Math.floor(Math.random() * (max - min) + min);
  let g = Math.floor(Math.random() * (max - min) + min);
  let b = Math.floor(Math.random() * (max - min) + min);
  let color = "#" + r.toString(16).padStart(2, '0') + 
    g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
  return color;
}

export default FileSelect;