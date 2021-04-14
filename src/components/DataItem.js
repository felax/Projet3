import React from 'react';

function DataItem(props) {
  return (
    <div style={{
      display:"flex",
      border: "1px solid black", 
      flex: "0 0 30px", 
      alignItems: "center",
      margin: "2px"
    }}>
      <div style={{flex:"0 0 30px", padding:"4px", borderRight:"1px solid"}}>
        <input 
          type="color" 
          draggable="true" 
          defaultValue={props.item.color} 
          onChange={e => props.updItem({
            color: e.target.value, 
            id: props.item.id
          })}
          onDragStart={
            e => e.dataTransfer.setData("text", props.item.id)
          }
        />
      </div>
      <div style={{
        flex:"1 1", 
        overflow:"hidden", 
        padding:"4px", 
        whiteSpace:"nowrap"
      }}>
        <input 
          type="text" 
          defaultValue={props.item.name} 
          onBlur={e => props.updItem({
            name: e.target.value, 
            id: props.item.id
          })}
        />
        <input 
          type="number" 
          placeholder="xOffset" 
          step="any"
          onBlur={e => props.updItem({
            offset: Number(e.target.value), 
            id: props.item.id
          })}
        />
        <button type="button">&#128712;</button>
        <button type="button" onClick={() => props.delItem(props.item.id)}>
          &#10060;
        </button>
      </div>
    </div>
  )
}

export default DataItem;