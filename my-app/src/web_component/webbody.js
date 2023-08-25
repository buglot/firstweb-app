import "./webbody.css";
import Menu_web from "./menu_web";
import Body_Web from "./body_web";
import { useState } from "react";
function Webbody(){
    document.title = "SMART KOR";
    const [menuClick , setClick] = useState(false);
    return(
        <div className="webbody-main-contrainner" style={{background: "#160D0D"}}>
            <Menu_web setClick={setClick} menuClick={menuClick}/>
            <Body_Web menuClick={menuClick}/>
        </div>
    );
}
export default Webbody;
