import "./liststate.css"

function LISTSTATE(props) {
    return (
        <div className="list-state-main-contrainer">

            <div className="rowtable">
               {props.date}
            </div>
            <div className="rowtable">
                {props.time}

            </div>
            <div className="rowtable">
                {props.report}
            </div>

        </div>
    )
}
export default LISTSTATE;