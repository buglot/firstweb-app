import Item_add_key from "../body_component/item_add_key";
import Item_key_manger from "../body_component/item_key_manger";
import "./main_home.css";
import { useEffect,useState } from "react";
import { url_myAPI } from "../../default/config";
function Page_Manger_key(props){
    const [key,setkey] = useState({})
    useEffect(()=>{
        fetch(url_myAPI+`/stateKey?id=${props.id}`)
        .then(response => response.json())
        .then(data =>{
            if(data.status){
                setkey(data.data)
            }
        })
    },[setkey])
    return(
        <div className="main_page">
            <Item_add_key/>
            {Object.keys(key).map((keyId, index) => (
                <Item_key_manger key={index} keyData={key[keyId]} />
            ))}
        </div>
    );
}
export default Page_Manger_key;
