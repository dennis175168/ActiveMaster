import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
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
        data:[{
            mb_id:'123',
            mb_name:'456'
        }],
    };
    // this.insert = this.insert.bind(this); //傳遞子物件
    // this.get_data = this.get_data.bind(this);
  }



  componentWillMount(){
  }

 


   render() {
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
              <ListGroupItem>歡迎使用 ActiveMaster 後臺系統 </ListGroupItem>
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
