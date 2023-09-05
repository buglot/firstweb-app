import { url_myAPI } from "../../../default/config";
import ListIntable from "./listintable";
import "./sharelist_item.css"
import React, { Component } from 'react';

class Sharelist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            idkey : props.idkey,
            useData:[]
        };
    }
    componentDidMount() {
        this.fetchData(); // เรียก fetchData เมื่อ component ถูก mount
        this.interval = setInterval(() => {
          this.fetchData(); // เรียก fetchData ทุก 10 วินาที
        }, 1000);
      }
    
      componentWillUnmount() {
        clearInterval(this.interval); // ต้องทำการล้าง Interval เมื่อ component ถูก unmount เพื่อป้องกันการทำงานของ Interval ที่ไม่จำเป็น
      }
    
      fetchData = () => {
        const { idkey } = this.state;
        fetch(url_myAPI+"/listUserkey?idkey="+idkey)
          .then(response => response.json())
          .then(data => {
            this.setState({ useData:data });
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      };
    
      render() {
        const { useData } = this.state;
        const { idkey } = this.state;
        return (
          <div className="share-list-container-main">
              {useData.map((item, index) => (
                <ListIntable index={index} idac={item.idac} email={item.email} idkey={idkey}/>
              ))}
          </div>
        );
      }
}
export default Sharelist;