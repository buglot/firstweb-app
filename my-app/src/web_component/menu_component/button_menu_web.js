import "./button_menu_web.css";

function Button_web_menu(props) {
    let Clickme = props.setmyID;
    let selection = props.select;
    let setSelection = props.setSeclect;
    return (
        <div className={Clickme===selection ? `button-web-menu-container-a`: "button-web-menu-container-q"} onClick={()=>{setSelection(Clickme);}}>
            <a>{props.name}</a>
        </div>
    );
}
export default Button_web_menu;