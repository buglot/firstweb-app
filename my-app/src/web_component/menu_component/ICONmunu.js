import "./ICONmenu.css";

function ICONmenu(props){
    let setClick = props.setClick
    let menuClick = props.value;
    return(
        <div className="icon-menu-container-main"onClick={()=>{setClick(!menuClick)}} >
            <div className="one"onClick={()=>{setClick(!menuClick)}}></div>
            <div className="one"onClick={()=>{setClick(!menuClick)}}></div>
            <div className="one"onClick={()=>{setClick(!menuClick)}}></div>
        </div>
    );
}
export default ICONmenu;