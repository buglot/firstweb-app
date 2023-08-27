import Item_add_key from "../body_component/item_add_key";
import Item_key_manger from "../body_component/item_key_manger";
function Page_Manger_key(props){
    return(
        <div className="body_webMain-n">
            <Item_add_key/>
            <Item_key_manger/>
        </div>
    );
}
export default Page_Manger_key;
