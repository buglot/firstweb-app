import "./item_state.css";
import { Component,useState } from "react";

import LISTSTATE from "./state_com/liststate";
import { url_myAPI } from "../../default/config";
export default class ITEM_STATE extends Component{
    constructor(props){
        super(props);
        this.state ={
            idkey:props.keyData["idkey"],
            nickname:props.keyData["nickname"],
            qu:10,
            histo:[]
        };
    }
    componentDidMount() {
        this.getState();
        this.interval = setInterval(() => {
            this.getState();
        }, 30000);
    }
    getState = () =>{
        const {idkey,qu} = this.state;
        fetch(`${url_myAPI}/HistoryKeys?idkey=${idkey}&n=${qu}`)
        .then(re => re.json())
        .then(data =>{
            if(data.status){
                this.setState({histo:data.data})
            }
        })
        .catch()
    }
    componentWillUnmount() {
        clearInterval(this.interval); // ต้องทำการล้าง Interval เมื่อ component ถูก unmount เพื่อป้องกันการทำงานของ Interval ที่ไม่จำเป็น
    }
    render(){
        const {idkey,nickname,qu,histo} = this.state;
        return (
            <div className="item-state-main-contrainer">
                <div className="title">
                    <div className="mixs">
                        <div className="namebar">{nickname}</div>
                        <div className="off">on</div>
                    </div>
                    <div className="state">
                        จำนวนเปิดปิด : 1
                        มีคนเข้าใกล้ : 1
                    </div>
                    <div>
                        <input type="number" defaultValue={qu} min="10" max="50" onChange={(e)=>{this.setState({qu:e.target.value})}} />
                        <input type="submit" onClick={()=>this.getState()}/>
                    </div>
                </div>
                <div className="colordss">
                    {histo.map((item, index) => (
                        <LISTSTATE index={index} time={item.time} date={item.date} report={item.report}/>
                    ))}
                </div>
                
            </div>
        );
    }
}
