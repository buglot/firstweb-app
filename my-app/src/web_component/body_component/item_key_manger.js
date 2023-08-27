import "./item_key_manger.css";
function Item_key_manger(props){
    return (
        <div className="item-key-manger-container">
            <div className="title">
            Key nickname : ประตูบ้าน 
            </div>
            <a>klasdjaslkdjwqpioeqwpoeiqwpoejalsdjklasdjsakld</a>
            <div className="groupButton">
                <button className="g" id="g">change name</button>
                <button className="b" id="b">manager</button>
                <button className="r" id="r">disconnect</button>
            </div>
        </div>
    );
}
export default Item_key_manger;