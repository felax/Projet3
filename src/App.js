import React from "react";
import Split from "react-split";
import GraphPane from "./components/GraphPane";
import DataPane from "./components/DataPane";
import UtilPane from "./components/UtilPane";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: {}, nItems: 0, graphs: {}, nGraphs: 0 };
    this.updItem = this.updItem.bind(this);
    this.delItem = this.delItem.bind(this);
    this.addGraph = this.addGraph.bind(this);
    this.delGraph = this.delGraph.bind(this);
    this.updGraphItem = this.updGraphItem.bind(this);
  }

  updItem(item) {
    const items = {...this.state.items};
    if (items.hasOwnProperty(item.id)) {
      items[item.id] = {...items[item.id], ...item};
    } else {
      item.id = this.state.nItems + 1;
      items[item.id] = item;
    }
    this.setState({items: items, nItems: item.id});
  }

  delItem(id) {
    console.log("DELETING")
    console.log(id)
    const items = {...this.state.items};
    delete items[id];

    const graphs = {...this.state.graphs};
    Object.values(graphs).forEach(graph => {
      if (graph.items.includes(id)) {
        graph.items.splice(graph.items.indexOf(id), 1);
      }
    })
    this.setState({items: items, graphs: graphs});
  }

  addGraph() {
    const graphs = {...this.state.graphs};
    const id = this.state.nGraphs + 1;
    graphs[id] = {id: id, items: []};
    this.setState({graphs: graphs, nGraphs: id});
    console.log("Adding Graphs:")
    console.log(graphs)
  }

  delGraph(id) {
    const graphs = {...this.state.graphs};
    delete graphs[id];
    this.setState({graphs: graphs});
  }

  updGraphItem({graphId, itemId, add}) {
    const graphs = {...this.state.graphs};
    const graph = graphs[graphId];
    if (add) {
      graph.items.push(itemId);
    } else {
      graph.items.splice(graph.items.indexOf(itemId), 1);
    }
    this.setState({graphs: graphs});
  }


  render() {
    return(
      <Split 
        sizes={[25,50,25]} 
        gutterAlign="start" 
        minSize={150}
        onDrag={() => window.dispatchEvent(new Event('resize'))}
        style={{display: "flex", flexDirection: "row"}}
      >
        <DataPane 
          items={this.state.items} 
          updItem={this.updItem}
          delItem={this.delItem}
        />
        <GraphPane 
          items={this.state.items}
          graphs={this.state.graphs}
          addGraph={this.addGraph} 
          delGraph={this.delGraph}
          updGraphItem={this.updGraphItem}
        />
        <UtilPane />
      </Split>
    )
  }
}

export default App;