import { url_myAPI } from "../../default/config";
import "./item_key_have.css";
import React, { Component } from 'react';
import pa from "../component/image 3.png";
export default class ItemHKey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idkey: props.keyData["idkey"],
            codeKey: props.keyData["codeKey"],
            nickname: props.keyData["nickname"]
        };
    }
    componentDidMount() { // เรียก fetchData เมื่อ component ถูก mount
        this.interval = setInterval(() => {// เรียก fetchData ทุก 10 วินาที
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval); // ต้องทำการล้าง Interval เมื่อ component ถูก unmount เพื่อป้องกันการทำงานของ Interval ที่ไม่จำเป็น
    }
    render() {
        const { useData } = this.state;
        const { idkey } = this.state;
        const { codeKey } = this.state;
        let shotkey = "(NO NICKNAME)\n" + codeKey.slice(0, 35) + "....."
        const { nickname } = this.state;
        return (
            <div className="item-key-have-container">
                <div className="dddd">
                    <img src={pa} />
                </div>
                {nickname === "" && <a>{shotkey}</a>}
                {nickname !== "" && <a>{nickname}</a>}
                <div className="dddd">
                    <div className="item-key-have-state">
                        ล็อก
                    </div>
                    <div className="item-key-have-button">
                        <a>ปลดล็อค</a>
                    </div>
                </div>

            </div>
        )
    }
}