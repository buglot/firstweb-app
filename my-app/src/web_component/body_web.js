import { useState } from "react";
import "./body_web.css";
import Page_HOME from "./body_page/page_web_home";
import Page_Manger_key from "./body_page/page_manger_key";
function Body_Web(propns) {
    let menuClick = propns.menuClick;
    let menuPageset = propns.Pageset;
    return (
        <div className={`body_webMain ${menuClick ? "full":""}`}>
            <div className="body_webMain-n">
                {propns.page == 0 && <Page_HOME Click={menuPageset}/>}
                {propns.page == 1 && <Page_Manger_key/>}
            </div>

        </div>
    );
}
export default Body_Web;