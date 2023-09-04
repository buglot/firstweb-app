import "./item_key_have.css";
import pa from "../component/image 3.png";

function Item_Key(props) {
    var codeKey  = props.keyData["codeKey"];
    let shotkey = "(NO NICKNAME)\n"+codeKey.slice(0,35)+".....";
    let nickname = props.keyData["nickname"];
    return (
        <div className="item-key-have-container">
            <div className="dddd">
                <img src={pa} />
            </div>
            {nickname === "" && <a>{shotkey}</a>}
            {nickname !== "" && <a>{nickname}</a>}
            <div className="dddd">
                <div className="item-key-have-state">
                    ล็อก
                </div>
                <div className="item-key-have-button">
                    <a>ปลดล็อค</a>
                </div>
            </div>

        </div>
    );
}
export default Item_Key;