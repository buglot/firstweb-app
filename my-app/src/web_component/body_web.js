import { useState } from "react";
import "./body_web.css";
import Items_body from "./itembody_web";
import pe from "./component/image1.png";
import Item_none from "./item_none_null";
function Body_Web(propns) {
    let menuClick = propns.menuClick;
    return (
        <div className={`body_webMain ${menuClick ? "full":""}`}>
            <div className="body_webMain-n">
                <img src={pe} />
                <Item_none />

            </div>

        </div>
    );
}
export default Body_Web;