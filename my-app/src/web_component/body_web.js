
import "./body_web.css";
import { url_myAPI } from "../default/config";
import { useEffect,useState } from "react";
import Page_HOME from "./body_page/page_web_home";
import Page_Manger_key from "./body_page/page_manger_key";
import PAGE_SHARE_KEY from "./body_page/page_share_key";
import Page_STATE from "./body_page/page_state";
function Body_Web(props) {
    let menuClick = props.menuClick;
    let menuPageset = props.Pageset;
    const [key,setkey] = useState({})
    useEffect(()=>{
        fetch(url_myAPI+`/stateKey?id=${props.id}`)
        .then(response => response.json())
        .then(data =>{
            if(data.status){
                setkey(data.data)
            }
        })
    },[setkey,props.id])
    return (
        <div className={`body_webMain ${menuClick ? "full":""}`}>
            {props.id != 0 &&
            <div className="body_webMain-n">
                {props.page == 0 && <Page_HOME Click={menuPageset} id={props.id} datakey={key} name={props.name}/>}
                {props.page == 1 && <Page_Manger_key id={props.id} datakey={key} name={props.name}/>}
                {props.page == 2 && <PAGE_SHARE_KEY id={props.id} datakey={key} name={props.name}/>}
                {props.page == 3 && <Page_STATE id={props.id} datakey={key} name={props.name}/>}
            </div>
            }
            { props.id == 0 && <div style={{color:"red"}}>404 no response </div>}
        </div>
    );
}
export default Body_Web;