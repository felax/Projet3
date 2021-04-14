import Dygraph from 'dygraphs';
import "./dygraph.css";
import React from 'react';
import { getBounds, getStep, scale2, arange, merge } from "../Utils";

class Graph extends React.Component {

  render() {
    const items = this.props.graph.items.map(id => {
      const item = this.props.items[id];
      return <LegendItem item={item} key={item.id}
        delItem={itemId => this.props.updGraphItem({
          graphId: this.props.graph.id, 
          itemId: itemId, 
          add: false 
        })}
      />
    })

    return(
      <div 
        style={{
          border: "1px solid gray", 
          resize: "vertical",
          overflow: "hidden",
          height: "200px", 
          display: "flex",
          flexDirection: "row"
        }}
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          const itemId = Number(e.dataTransfer.getData("text"));
          if (this.props.graph.items.includes(itemId)) {return;}
          this.props.updGraphItem({
            graphId: this.props.graph.id, 
            itemId: itemId, 
            add: true
          })
        }}
      >
        <div style={{
          flex: "0 0 150px", 
          display: "flex", 
          flexDirection:"column"
        }}>
          <div style={{flex:"1 1", display:"flex", flexDirection:"column"}}>
            {items}
          </div>
          <div style={{flex: "0 0 30px"}}>
            <button type="button" 
              onClick={() => this.props.delGraph(this.props.graph.id)}
            >
              &#10060;
            </button>
          </div>
        </div>
        <div id={"dy"+String(this.props.graph.id)} style={{
          width: "calc(100% - 150px)", 
          paddingBottom: "20px"
        }}/>
      </div>
    )
  }

  componentDidMount() {
    this.dygraph = new Dygraph("dy"+String(this.props.graph.id), [[0, 0]],
      {
        labels: ["x", "y"],
        legend: "follow",
        connectSeparatedPoints: true,
      }
    );
  }

  componentDidUpdate() {
    console.log("UPDATING GRAPHS")
    const step = this.props.step;
    const graphBounds = getBounds(this.props.graph.items, this.props.items);
    const labels = ["x"];
    const colors = [];
    const dataArr = [arange(graphBounds, step)];
    this.props.graph.items.forEach(id => {
      const item = this.props.items[id];
      colors.push(item.color);
      labels.push(item.name);
      dataArr.push(scale2(item, graphBounds, step));
    });
    let data = merge(dataArr);
    if (labels.length <= 1) {
      labels.push("y");
      data = [[0, 0]];
    }
    this.dygraph.updateOptions({
      file: data,
      labels: labels,
      colors: colors,
      dateWindow: this.props.bounds,
      axes: {
        x: { drawAxis: this.props.drawX },
        y: { drawAxis: this.props.drawY }
      },
  });
  }
}

function LegendItem(props) {
  return (
    <div style={{
      color: props.item.color, 
      fontWeight: "bold", 
      whiteSpace:"nowrap", 
      overflow:"hidden"
    }}>
      <button onClick={e => {props.delItem(props.item.id)}}>x</button>
      {props.item.name}
    </div>
  )
}


export default Graph;