import "./item_state.css";
import { Component } from "react";
import LISTSTATE from "./state_com/liststate";
export default class ITEM_STATE extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.interval = setInterval(() => {
        }, 20000);
    }

    componentWillUnmount() {
        clearInterval(this.interval); // ต้องทำการล้าง Interval เมื่อ component ถูก unmount เพื่อป้องกันการทำงานของ Interval ที่ไม่จำเป็น
    }
    render(){
        return (
            <div className="item-state-main-contrainer">
                <div className="title">
                    <div className="mixs">
                        <div className="namebar">aasd</div>
                        <div className="off">on</div>
                    </div>
                    <div className="state">
                        จำนวนเปิดปิด : 1
                        มีคนเข้าใกล้ : 1
                    </div>
                    <input type="number" defaultValue="10" min="10" max="50"></input>
                </div>
                <div className="colordss">
                    <LISTSTATE/>
                    <LISTSTATE/>
                    <LISTSTATE/>
                    <LISTSTATE/>
                </div>
                
            </div>
        );
    }
}
