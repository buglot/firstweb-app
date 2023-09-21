import "./main_home.css";
import { url_myAPI } from "../../default/config";
import Item_share_key from "../body_component/item_share_key";

function PAGE_SHARE_KEY(props){
    let key = props.datakey;
    let count =0
    return (
        <div className="main_page">
            {Object.keys(key).length === 0 && <div style={{color:"red"}}>You don't have any host key.</div>}
            {Object.keys(key).map((keyId, index) => {
                if (key[keyId].hostkey) {
                    count++;
                    return <Item_share_key key={index} keyData={key[keyId]} />;
                }
                return null;
            })}
            {count === 0 && <div style={{color:"red"}}>You don't have any host key.</div>}
        </div>
    );
}
export default PAGE_SHARE_KEY;