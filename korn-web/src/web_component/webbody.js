import "./webbody.css";
import Menu_web from "./menu_web";
import Body_Web from "./body_web";
import { useState,useEffect } from "react";
import { url_myAPI } from "../default/config";
import { useLocation,useNavigate } from "react-router-dom";

function Webbody(props){
    const location = useLocation();
    const history = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const mValue = queryParams.get("m");
    const pageValue = queryParams.get("page");
    document.title = "SMART KOR";
    const [menuClick , setClick] = useState(false);
    const [page , setPageSelect] = useState(0);
    if(pageValue===null){
        if (pageValue!==page){
            if(page!==0)
            setPageSelect(0);
            history(location.pathname+"?m="+mValue+"&&"+"page=0")
        }
    }else{
        if(page!==pageValue)
        setPageSelect(pageValue);
    }
    const [name,setName] = useState("");
    const [idaccount,setidaccount] = useState(0);
    useEffect(()=>{
        fetch(url_myAPI+"/d?m="+mValue)
        .then(response => response.json())
        .then(data => {
            if(data.status){
            setName(data.email);
            setidaccount(data.id);
            }else{
                setName(data.error);
            }
        })
        .catch(err =>{
            
        });
    },[setName,setidaccount]);
    return(
        <div className="webbody-main-contrainner" style={{background: "#160D0D"}}>
            <Menu_web setClick={setClick} menuClick={menuClick} selectpage={page} setPage={setPageSelect} name={name}/>
            
            <Body_Web menuClick={menuClick} types={"full"} page={page} Pageset={setPageSelect} id={idaccount} name={name} />
        </div>
    );
}
export default Webbody;
