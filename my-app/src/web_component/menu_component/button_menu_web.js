import { useNavigate,useLocation } from "react-router-dom";
import "./button_menu_web.css";

function Button_web_menu(props) {
    const location = useLocation();
    const history = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const mValue = queryParams.get("m");
    const pageValue = queryParams.get("page");
    let Clickme = props.setmyID;
    let selection = props.select;
    return (
        <div className={Clickme==selection ? `button-web-menu-container-a`: "button-web-menu-container-q"} onClick={()=>{history(location.pathname+"?m="+mValue+"&&"+"page="+Clickme)}}>
            <a>{props.name}</a>
        </div>
    );
}
export default Button_web_menu;