import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap';
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
            
            <h2>Home</h2>
            :
            
            <h2>error</h2>
            
          }
        </div>   

         

        
      );
   }
}
export default Home;
