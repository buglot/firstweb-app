import { url_myAPI } from "../../default/config";
import "./item_share_key.css"
import Sharelist from "./sharelist/sharelist_item";
function Item_share_key(props){
    console.log(props.keyData)
    let idkey = props.keyData["idkey"];
    let codeKey= props.keyData["codeKey"];
    let share = props.keyData["shareKey"];
    let newcodekey = codeKey.slice(0, 5) + " ..... " + codeKey.slice(55, 64)
    let nickname = props.keyData["nickname"];
    const genkey =(e) =>{
        e.preventDefault();
        fetch(url_myAPI+"/genKeyshare?idkey="+idkey+"&w=1")
        .then(r=>r.json())
        .then(data =>{
            if(data.status){
                alert(`key : " ${data.data} "` +" is share you can give someone to connect.")
                window.location.reload();
                
            }
        })
    }
    const delkey =(e) =>{
        e.preventDefault();
        fetch(url_myAPI+"/genKeyshare?idkey="+idkey+"&w=2")
        .then(r=>r.json())
        .then(data =>{
            if(data.status){
                
                window.location.reload();
                
            }else{
                alert(data.error)
            }
        })
        .catch(err=>alert(err))
    }
    return (
        <div  className="item-share-key-contrainer-main">
            <div className="item-share-key-contrainer-head">
                <div className="nickname">
                    {nickname!=="" && nickname}
                    {nickname==="" && newcodekey}
                </div>
                <div className="codekey">
                    {newcodekey}
                </div>
                <div style={{display:"flex",flexDirection:"row",gap:5}}>
                    <button style={{fontSize:20,fontWeight:700}} onClick={()=>window.location.reload()}>⟳</button>
                    <form onSubmit={genkey}>
                    <button type="submit">
                        gen key share
                    </button>
                    </form>
                </div>
            </div>
            {share!=="" && <div className="item-share-key-contrainer-head">

                <a style={{color:"white",fontWeight:600}}>Shares : {share}</a>
                <form onSubmit={delkey}>
                    <button className="xbutton">
                        <a>X</a>
                    </button>
                </form>
            </div>}
            <Sharelist idkey={idkey}/>
        </div>
    );
}
export default Item_share_key;