import { useState } from "react";
import "./menu_web.css"
import ICONmenu from "./menu_component/ICONmunu";
function Menu_web(popns){
    
    let setClick = popns.setClick;
    let menuClick = popns.menuClick;
    return (
        <div>
            <ICONmenu setClick = {setClick} value={menuClick}/>
            <div className={`Menu_web ${menuClick ? "close" : "open"}`}>
                
                <h2 className="menu-web_fontwhite">Welcome my web site</h2>
            </div>
        </div>
        
    );
}
export default Menu_web;