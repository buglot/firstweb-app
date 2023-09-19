import Item_add_key from "../body_component/item_add_key";
import Item_key_manger from "../body_component/item_key_manger";
import "./main_home.css";
function Page_Manger_key(props){
    let key = props.datakey;
    return(
        <div className="main_page">
            <Item_add_key id={props.id} name={props.name}/>
            {Object.keys(key).map((keyId, index) => (
                <Item_key_manger key={index} keyData={key[keyId]} idac={props.id} name={props.name} />
            ))}
        </div>
    );
}
export default Page_Manger_key;
