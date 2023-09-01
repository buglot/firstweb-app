import { useState } from "react";
import "./body_web.css";
import Page_HOME from "./body_page/page_web_home";
import Page_Manger_key from "./body_page/page_manger_key";
function Body_Web(propns) {
    let menuClick = propns.menuClick;
    let menuPageset = propns.Pageset;
    return (
        <div className={`body_webMain ${menuClick ? "full":""}`}>
            {propns.id != 0 &&
            <div className="body_webMain-n">
                {propns.page == 0 && <Page_HOME Click={menuPageset} id={propns.id}/>}
                {propns.page == 1 && <Page_Manger_key id={propns.id}/>}
            </div>
            }
            { propns.id == 0 && <div style={{color:"red"}}>404 no response </div>}
        </div>
    );
}
export default Body_Web;