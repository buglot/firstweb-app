import "../web_component/webbody"
import Body_Web from "../web_component/body_web";
import { useState } from "react";
function M_body(){
    document.title = "SMART KOR";
    const [menuClick , setClick] = useState(true);
    const [page , setPageSelect] = useState(0);
    return (
        <div className="webbody-main-contrainner">
            <Body_Web menuClick={menuClick} page={page} Pageset={setPageSelect}/>
        </div>
    );
}
export default M_body;