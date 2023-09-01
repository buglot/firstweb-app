import "./item_key_manger.css";
import { url_myAPI } from "../../default/config";
function Item_key_manger(props){
    var codeKey  = props.keyData["codeKey"];
    let shotkey = "(NO NICKNAME)\n"+codeKey.slice(0,35)+".....";
    let nickname = props.keyData["nickname"];
   
    return (
        <div className="item-key-manger-container">
            <div className="title">
            {nickname === "" && <div>{shotkey}</div>}
            {nickname !== "" && <div>{nickname}</div>}
            </div>
            <a>{codeKey}</a>
            <div className="groupButton">
                <button className="g" id="g">change name</button>
                <button className="b" id="b">manager</button>
                <button className="r" id="r">disconnect</button>
            </div>
        </div>
    );
}
export default Item_key_manger;