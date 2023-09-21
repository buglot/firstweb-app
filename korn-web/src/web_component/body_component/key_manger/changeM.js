import "./style.css";
import { url_myAPI } from "../../../default/config";
import { useState } from "react";

function ChangeName(props) {
    let set = props.set;
    const [nameChange, setNameChange] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const Connects = (e) => {
        e.preventDefault();
        if (nameChange !== "") {
            fetch(url_myAPI + `/changeName?idaccount=${props.idac}&&idkey=${props.idkey}&&name=${nameChange}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        setErrorMessage(data.data);
                        if(window.confirm(data.data)){
                            window.location.reload();
                        }
                    } else {
                        setErrorMessage(data.error);
                    }
                })
                .catch(error => setErrorMessage("Error in server. Please try again."));
        }else{
            setErrorMessage("Plase enter name .")
        }
    }
    return (
        <div className="contrainer-changeM-name-m">
            <form className="contrainer-changeM-name" onSubmit={Connects}>
                <input type="text" placeholder="Name Change" onChange={(e) => { setNameChange(e.target.value); setErrorMessage("") }}></input>
                <button className="buttonc" type="submit">Change</button>

                <button className="buttonD" onClick={() => { set(0) }}>X</button>

            </form>
            {errorMessage && <a> {errorMessage}</a>}
        </div>
    );

}
export default ChangeName;