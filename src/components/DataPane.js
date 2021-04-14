import React from 'react';
import FileSelect from "./FileSelect";
import DataItem from "./DataItem";

function DataPane(props) {
  const items = Object.values(props.items).map(item => {
    return <DataItem 
      item={item} 
      updItem={props.updItem} 
      delItem={props.delItem} 
      key={item.id}
    />;
  })

  return(
    <div style={{
      display: "flex", 
      flexDirection: "column", 
      borderWidth: "thin", 
      border: "1px solid black"
    }}>
      <div style={{
        display: "flex", 
        flexDirection: "row", 
        border: "1px solid black", 
        flex: "0 0 20px"
      }}>
        <FileSelect addItem={props.updItem}/>
      </div>
      <div style={{display: "flex", flexDirection: "column", flex: "1 1"}}>
        {items}
      </div>
    </div>
  )
}

export default DataPane;