import "./item_add_key.css";
import { useState } from "react";
function Item_add_key(){
    const [errorMessage ,setErrorMessage] = useState("");
    return (
        <div className="item-add-key-contrainer">
            <a>Key connect</a>
            <input type="text" placeholder="key code"/>
            <button type="submit">Connect</button>
        </div>
    );
}
export default Item_add_key;