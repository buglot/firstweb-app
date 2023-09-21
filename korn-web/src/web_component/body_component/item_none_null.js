import "./item_none_null.css"

function Item_none(props){
    return(
        <div className="item_none_null-main-contrainer">
           <p>None Key Connected</p> 
           <a onClick={()=>{props.Click(1);window.location.search=window.location.search.replace("page=0","page=1")}} style={{cursor:"pointer"}}>
           Click to Conected Key
           </a>
        </div>
    );
}
export default Item_none;