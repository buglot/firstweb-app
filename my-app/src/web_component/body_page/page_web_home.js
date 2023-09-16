import pe from "../component/image1.png";
import Item_none from "../body_component/item_none_null";
import "./main_home.css";
import ItemHKey from "../body_component/ItemKey";
function Page_HOME(props){
    let key = props.datakey;
    return(
        <div className="main_page">
            <img src={pe} />
            {Object.keys(key).length === 0 && <Item_none Click={props.Click} />}
            {Object.keys(key).map((keyId, index) => (
                <ItemHKey key={index} keyData={key[keyId]} />
            ))}
        </div>
    );
}
export default Page_HOME;