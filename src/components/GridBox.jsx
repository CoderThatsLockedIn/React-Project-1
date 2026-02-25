import React from "react";
import "./GridBox.css";

function GridBox({title, content}) {
    return (
        <div style={{
            height: '100px', 
            width: '200px',  
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start',
            alignItems: 'flex-start',    
            borderRadius: '10px',        
            padding: '10px',             
            border: '2px solid blue'     
        }}>
            <div style={{ fontSize: '30px', fontWeight: "bold" }}>{title}</div>
            <div style={{ fontSize: '16px' }}>{content}</div>
        </div>
    );
}
export default GridBox;