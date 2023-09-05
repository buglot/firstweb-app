import { url_myAPI } from "../../../default/config";
import "./sharelist_item.css"

export default function ListIntable(props) {
    let idac = props.idac;
    let email = props.email;
    let idkey =props.idkey;
    let index = props.index;
    return (
        <div className="rowtab">
            <div className="g">
                <div className="rowsize">{index + 1} .</div>
                <div className="rowsize">{email}</div>
            </div>
            <div className="g rowsizes">
                <button className="buttonlist">tranfer host</button>
                <button className="buttonlist">kick</button>
            </div>
        </div>
    );
}