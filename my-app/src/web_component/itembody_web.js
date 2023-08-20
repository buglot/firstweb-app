import "./body_web.css";
import { useState } from "react";

function Items_body(props){
    return (
        <div className="Items">   
            {props.text}
        </div>
    );
}
export default Items_body;