
import "./body-web.css"
import ItemProt from "./itemBox-web";
function Body_web_P(props){
    let menuClick = props.menuClick;
    let setMenuClick = props.setMenuClick;
    return (
        <div className={`container ${menuClick ? "":"menushow"}`}>
            <div className="midBox">
                <ItemProt title="แนะนำตัว" text={`sad
                asdasa
                sdfd`}/>
                
            </div>
        </div>
    );
}

export default Body_web_P;