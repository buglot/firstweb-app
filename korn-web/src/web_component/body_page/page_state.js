import "./main_home.css";
import { Component } from "react";
import ITEM_STATE from "../body_component/item_state";
export default function Page_STATE(props) {
    let key = props.datakey;
    return (
        <div className="main_page">
             {Object.keys(key).map((keyId, index) => (
                <ITEM_STATE key={index} keyData={key[keyId]}/>
            ))}
        </div>
    );
}
