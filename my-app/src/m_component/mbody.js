import "../web_component/webbody"
import Body_Web from "../web_component/body_web";
import { useState,useEffect } from "react";
import { url_myAPI } from "../default/config";
import { useLocation,useNavigate } from "react-router-dom";

function M_body(){
    document.title = "SMART KOR";
    const history = useNavigate();
    const [menuClick , setClick] = useState(true);
    const [page , setPageSelect] = useState(0);
    const [name,setName] = useState("");
    const [idaccount,setidaccount] = useState(0);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mValue = queryParams.get("m");
    const pageValue = queryParams.get("page");
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
    return (
        <div className="webbody-main-contrainner">
            <Body_Web menuClick={menuClick} page={page} Pageset={setPageSelect} id={idaccount}/>
        </div>
    );
}
export default M_body;