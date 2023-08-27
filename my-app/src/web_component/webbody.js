import "./webbody.css";
import Menu_web from "./menu_web";
import Body_Web from "./body_web";
import { useState } from "react";
function Webbody(){
    document.title = "SMART KOR";
    const [menuClick , setClick] = useState(false);
    const [page , setPageSelect] = useState(0);
    return(
        <div className="webbody-main-contrainner" style={{background: "#160D0D"}}>
            <Menu_web setClick={setClick} menuClick={menuClick} selectpage={page} setPage={setPageSelect}/>
            <Body_Web menuClick={menuClick} page={page} Pageset={setPageSelect}/>
        </div>
    );
}
export default Webbody;
