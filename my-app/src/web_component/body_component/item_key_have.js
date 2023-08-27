import "./item_key_have.css";
import pa from "../component/image 3.png";
function Item_Key() {
    return (
        <div className="item-key-have-container">
            <img src={pa} />
            <a>ประตูบ้าน</a>
            <div className="item-key-have-state">
                ล็อก
            </div>
            <div className="item-key-have-button">
                <a>ปลดล็อค</a>
            </div>
        </div>
    );
}
export default Item_Key;