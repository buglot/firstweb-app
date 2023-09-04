import "./item_add_key.css";
import { useState } from "react";
import { url_myAPI } from "../../default/config";

function Item_add_key(props) {
    const [errorMessage, setErrorMessage] = useState("");
    const [keyConect, setKeyConect] = useState("");
    const ClickConnect = (e) => {
        e.preventDefault();
        const formData = new URLSearchParams();
        formData.append('key', keyConect);
        formData.append('id', props.id);
        fetch(`${url_myAPI}/connectKey`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    window.location.reload();
                } else {
                    setErrorMessage(data.error)
                }
            })
            .catch(error => setErrorMessage("Server is Error Sorry."))
    }
    return (
        <form className="item-add-key-contrainer" onSubmit={ClickConnect}>
            <a>Key connect</a>
            <input type="text" placeholder="key code" onChange={(e) => { setKeyConect(e.target.value); setErrorMessage("") }} />
            <button type="submit" >Connect</button>
            {errorMessage && <a>{errorMessage}</a>}
        </form>

    );
}
export default Item_add_key;