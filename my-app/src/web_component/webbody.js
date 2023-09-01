import "./webbody.css";
import Menu_web from "./menu_web";
import Body_Web from "./body_web";
import Cookies from 'js-cookie';
import { useState,useEffect } from "react";
import { url_myAPI } from "../default/config";
function Webbody(){
    document.title = "SMART KOR";
    const [menuClick , setClick] = useState(false);
    const [page , setPageSelect] = useState(0);
    const [name,setName] = useState("");
    const [idaccount,setidaccount] = useState(0);
    let a =document.URL.split("app?m=")[1];
    useEffect(()=>{
        fetch(url_myAPI+"/d?m="+a)
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
            <Body_Web menuClick={menuClick} page={page} Pageset={setPageSelect} id={idaccount} />
        </div>
    );
}
export default Webbody;
