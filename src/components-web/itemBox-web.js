import "./itemBox-web.css"

function ItemProt(props) {
    let title = props.title;
    let contect = props.text;
    return (
        <div className="containersItemBox">
            <div className="b">
                <b>{title}</b>
                <div className="f"style={{float:"right",color:"white",width:20,borderRadius:5,cursor:"pointer"}}>
                    <b>-</b>
                </div>
            </div>
            <div className="bodyContect defaulttext">
                {contect}
            </div>
        </div>
    );
}
export default ItemProt;