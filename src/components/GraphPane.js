import React from 'react';
import Graph from "./Graph";
import { getBounds } from "../Utils";

class GraphPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 1e-5, drawX: true, drawY: true };
  }

  render() {
    const bounds = getBounds(
      getActiveItems(this.props.graphs), 
      this.props.items
    );
    const graphs = Object.entries(this.props.graphs).map(([id, graph]) => {
      return (
        <Graph key={id} 
          delGraph={this.props.delGraph}
          updGraphItem={this.props.updGraphItem}
          items={this.props.items} 
          graph={graph}
          bounds={bounds}
          step={this.state.step}
          drawX={this.state.drawX}
          drawY={this.state.drawY}
        />
      )
    })

    return(
      <div style={{display: "flex", flexDirection: "column", overflow: "auto"}}>
        <div style={{flex: "0 0 20px", border: "1px solid"}}>
          <button onClick={this.props.addGraph}>+</button>
          <input 
            type="number"
            step="any"
            defaultValue={this.state.step}
            onBlur={e => {
              this.setState({ step: Number(e.target.value) })
              console.log(e)
            }}
          />
          <input type="checkbox" defaultChecked onClick={e => {
            this.setState({ drawX: e.target.checked });
          }}/>
          <input type="checkbox" defaultChecked onChange={e => {
            this.setState({ drawY: e.target.checked });
          }}/>
        </div>
        {graphs}
      </div>
    )
  }
}

function getActiveItems(graphs) {
  const items = [];
  Object.values(graphs).forEach(graph => {
    graph.items.forEach(item => {
      if (!items.includes(item)) items.push(item);
    })
  })
  return items;
}

export default GraphPane;