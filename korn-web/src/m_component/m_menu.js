import "./m_menu.css";
import homeicon from "./component/istockphoto-1272687883-612x612.jpg";
import { useNavigate,useLocation } from "react-router-dom";
import mannegericon from "./component/1166900.png";
import shareicon from "./component/icons_B-12-512.webp"
import historyicon from "./component/5582334.png"
import accounticon from "./component/6681204.png"
export default function M_MENU(props) {
    const history = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const mValue = queryParams.get("m");
    return (
        <div className="m-menu-contrainer">
                <div className="inner-contraier">
                    <img className={`${props.page === "3"? "f":""}`} src={historyicon} onClick={()=>{history(window.location.pathname+"?m="+mValue+"&page=3");}}/>
                    <img className={`${props.page === "1"? "f":""}`} src={mannegericon} onClick={()=>{history(window.location.pathname+"?m="+mValue+"&page=1");}}/>
                    <img className={`${props.page === "0"? "f":""}`} src={homeicon} onClick={()=>{history(window.location.pathname+"?m="+mValue+"&page=0");}}/>
                    <img className={`${props.page === "2"? "f":""}`} src={shareicon} onClick={()=>{history(window.location.pathname+"?m="+mValue+"&page=2");}}/>
                    <img className={`${props.page === "4"? "f":""}`} src={accounticon} onClick={()=>{history(window.location.pathname+"?m="+mValue+"&page=4");}}/>
                </div>

        </div>
    );
}