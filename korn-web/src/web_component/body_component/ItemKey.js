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
            nickname: props.keyData["nickname"],
            onOFF: 0
        };
    }
    componentDidMount() {
        this.fetchData();
        this.interval = setInterval(() => {
            this.fetchData();
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    fetchData = () => {
        const { idkey } = this.state;
        fetch(url_myAPI + "/Softcheck?idkey=" + idkey)
            .then(response => response.json())
            .then(data => {
                this.setState({ onOFF: data });
                
            })
    }

    doHardwar= (s) =>{
        const { idkey } = this.state;
        const formData = new URLSearchParams();
        formData.append('idkey', idkey);
        formData.append('c', s);
        formData.append('who', this.props.keyData["hostkey"]? '(Host)':this.props.name);
        fetch(url_myAPI + "/OpenClose", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()})
            .then(response => response.json())
            .then(data => {
                if(data.status==500){
                    console.log(data.error)
                }else if(data.status==200){
                    this.setState({ onOFF: data.st });
                    window.location.reload();
                }
                
            })
    }

    render() {
        const { idkey } = this.state;
        const { codeKey } = this.state;
        const { onOFF } = this.state;
        
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
                    {onOFF === 0 && <div className="item-key-have-state">
                        ล็อค
                    </div>}
                    {onOFF === 1 && <div className="item-key-have-state">
                        ปลดล็อค
                    </div>}
                    {onOFF === 0 && <div className="item-key-have-button" onClick={(e)=>{this.doHardwar(1)}}>
                        <a>ปลดล็อค</a>
                    </div>}
                    {onOFF === 1 && <div className="item-key-have-button-f" onClick={()=>{this.doHardwar(0)}}>
                        <a>ล็อค</a>
                    </div>
                    }
                </div>
            </div>
        )
    }
}