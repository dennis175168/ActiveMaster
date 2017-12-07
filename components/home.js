import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import {SqlApi_url} from '../config';
import {
  Button,
  Table,
  Well,
  ButtonGroup,
  Glyphicon,
  Image,
  Nav,
  NavItem,
  Tab,
  Collapse,
  Modal,
  Popover,
  Tooltip,
  OverlayTrigger,
  Tabs,
  ListGroup,
  ListGroupItem,
  Panel
} from 'react-bootstrap';
import Login from './login';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        admin:[{
          admin_id:'123',
          admin_name:'456'
        }],
    };
    this.get_admin = this.get_admin.bind(this); //傳遞子物件
    // this.get_data = this.get_data.bind(this);
  }



  componentWillMount(){
    this.get_admin();
  }


  get_admin(){
    const admin_id = localStorage.getItem('admin_id');

    const data = new FormData();
    data.append('sql',"select * from admin where admin_id = '"+admin_id+"'" )

    fetch(SqlApi_url, {
        method:'post',
        body:data,
    })
    .then((res) => {
        return res.json();
    }).catch((e)=>{
        console.log(e);
        alert(user);})
    .then((res) => {
        this.setState({admin: res});
    }).catch((e)=>{
        console.log(e);
        alert(user);
    });
}

 


   render() {
     const admin_id = localStorage.getItem('admin_id');
     //this.aa();
     const log =localStorage.getItem('status');
      return (
        <div>
          { log == 1  ?
            <div>
            <Well>
              <h2>Home</h2>
            </Well>
            <Well>
            <ListGroup>
              <ListGroupItem>管理員: {this.state.admin[0].admin_name}  歡迎使用 ActiveMaster 後臺系統 </ListGroupItem>
            </ListGroup>
              
            </Well>
            </div>
            
            :
            
            <h2>error</h2>
            
          }
        </div>   

         

        
      );
   }
}
export default Home;
