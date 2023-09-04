import "./item_key_manger.css";
import { useState } from "react";
import ChangeName from "./key_manger/changeM";
import { url_myAPI } from "../../default/config";
function Item_key_manger(props) {
    var codeKey = props.keyData["codeKey"];
    let shotkey = "(NO NICKNAME)\n" + codeKey.slice(0, 35) + ".....";
    let nickname = props.keyData["nickname"];
    let hostkey = props.keyData["hostkey"];
    let idkey = props.keyData["idkey"];
    const [buttonChoose, setbuttonChoose] = useState(0);
    const [errorMessage,setErrorMessage] = useState("");
    if (!hostkey) {
        codeKey = "(host) " + codeKey;
    }
    return (
        <div className="item-key-manger-container">
            <div className="title">
                {nickname === "" && <div>{shotkey}</div>}
                {nickname !== "" && <div>{nickname}</div>}
            </div>
            <a>{codeKey}</a>
            <div className="groupButton">
                <button className="g" id="g" onClick={() => {setbuttonChoose(1);setErrorMessage("")}}>change name</button>
                {hostkey === true && <button className="b" id="b" onClick={() => {setbuttonChoose(2);setErrorMessage("")}}>manager</button>}
                <button className="r" id="r"
                    onClick={() => {
                        setErrorMessage("");
                        setbuttonChoose(3);
                        if(!hostkey && (window.confirm("Are you sure to disconnect is key?"))){
                            fetch(url_myAPI+`/disconectkey?idaccount=${props.idac}&&idkey=${idkey}`)
                            .then(response => response.json())
                            .then(data=>{
                                if(data.status){
                                    window.location.reload();
                                }else{
                                    setErrorMessage(data.error);
                                }
                            })
                        }else if(hostkey){
                            alert("You is host key cant to disconect key. You mush change host.");
                            setErrorMessage("You is host key cant to disconect key. You mush change host.");
                        }
                    }
                    }>disconnect</button>
            </div>
            {errorMessage && <div>{errorMessage}</div>}
            {buttonChoose === 1 && <ChangeName set={setbuttonChoose} idac={props.idac} idkey={idkey} />}
        </div>
    );
}
export default Item_key_manger;