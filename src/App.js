import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import {NotificationContainer, NotificationManager} from 'react-notifications';

import 'react-notifications/lib/notifications.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: false,
            endpoint: "http://127.0.0.1:4001"
        };
        this.createNotification=this.createNotification.bind(this);
    }
    createNotification(type,text,time){
          switch (type) {
            case 'info':
              NotificationManager.info(text,'',time);
              break;
            case 'success':
              NotificationManager.success(text,'',time);
              break;
            case 'warning':
              NotificationManager.warning(text,'', time);
              break;
            case 'error':
              NotificationManager.error(text, '', time);
              break;
          }
        }
    componentDidMount() { 
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("FromAPI", data => this.setState({ response: data }));
    }

    getVal(val){
        if(val == 1){
            return <img src="/carrot.png" />;
        }else if(val == 2){
            return <img src="/rabbit.png" />;
        }else if(val == 3){
            return <img src="/wolf.png" />;
        }else{
            return "";
        }
    }

    getUniqueNotifications(array){
        var flags = [], output = [], l = array.length, i;
        for( i=0; i<l; i++) {
            if( flags[array[i].text]) continue;
            flags[array[i].text] = true;
            output.push(array[i]);
        }
        return output;
    }
    render() {
        const { response } = this.state;
        const { wolfs, carrots, rabbits,grid,notifications } = response;
        if(notifications){
            this.getUniqueNotifications(notifications).map((msg)=>{
                this.createNotification(msg.type,msg.text,msg.time);
            });
        }
        return (
            <React.Fragment>
                <div className="grid-container">
                <div className="grid-item">Total Wolfs:{wolfs}</div>
                <div className="grid-item">Total carrots:{carrots}</div>
                <div className="grid-item">Total rabbits:{rabbits}</div>
                </div>
                {response
                    ? 
                        <div className="content">
                        {
                            grid.map(
                                arr=> <tr>
                                 {arr.map((val,i) => <td key={i}>{this.getVal(val)}</td>)}
                              </tr> 
                               )
                            
                        }
                        </div>
                    : <p>Loading...</p>}
                    <NotificationContainer/>
            </React.Fragment>
        );
    }
}
export default App;