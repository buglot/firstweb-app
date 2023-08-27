import pe from "../component/image1.png";
import Item_none from "../body_component/item_none_null";
import Item_Key from "../body_component/item_key_have";
function Page_HOME(props){
    return(
        <div className="body_webMain-n">
            <img src={pe} />
            <Item_none Click={props.Click}/>
            <Item_Key/>
        </div>
    );
}
export default Page_HOME;