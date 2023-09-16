import { url_myAPI } from "../../../default/config";
import "./sharelist_item.css"

export default function ListIntable(props) {
    let idac = props.idac;
    let email = props.email;
    let idkey = props.idkey;
    let index = props.index;
    const skick = () => {
        if (window.confirm(`sure to kick ${email}`)) {
            fetch(url_myAPI + `/disconectkey?idaccount=${idac}&&idkey=${idkey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        window.location.reload();
                    } else {
                        alert(data.error);
                    }
                })

        }
    }
    const tranfers = () => {
        if (window.confirm(`do you tranfer host key?`)) {
            if (window.confirm(`Are you sure? tranfer host key to ${email}`)) {
                if (window.confirm(`One more time Are you sure? ${email}`)) {
                    fetch(url_myAPI + `/tranferhost?idac=${idac}&&idkey=${idkey}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status) {
                                alert(data.data)
                                window.location.reload();
                            } else {
                                alert(data.error);
                            }
                        })
                }
            }

        }
    }
    return (
        <div className="rowtab">
            <div className="g">
                <div className="rowsize">{index + 1} .</div>
                <div className="rowsize">{email}</div>
            </div>
            <div className="g rowsizes">
                <button className="buttonlist" onClick={tranfers} >tranfer host</button>
                <button className="buttonlist" onClick={skick}>kick</button>
            </div>
        </div>
    );
}