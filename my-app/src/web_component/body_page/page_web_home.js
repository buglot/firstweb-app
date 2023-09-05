import pe from "../component/image1.png";
import Item_none from "../body_component/item_none_null";
import Item_Key from "../body_component/item_key_have";
import { useEffect, useState } from "react";
import { url_myAPI } from "../../default/config";
import "./main_home.css";
function Page_HOME(props){
    let key = props.datakey;
    console.log(key)
    return(
        <div className="main_page">
            <img src={pe} />
            {Object.keys(key).length === 0 && <Item_none Click={props.Click} />}
            {Object.keys(key).map((keyId, index) => (
                <Item_Key key={index} keyData={key[keyId]} />
            ))}
        </div>
    );
}
export default Page_HOME;