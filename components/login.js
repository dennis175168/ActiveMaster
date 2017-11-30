import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Table, Well, ButtonGroup, Glyphicon, Image, Nav, NavItem,Tab} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link ,Form, FormGroup, Col ,Checkbox ,ControlLabel ,FormControl } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            user:[{
                mb_id:'fail',
            }],
        };
        this.check_members = this.check_members.bind(this); //傳遞子物件
        //this.get_data = this.get_data.bind(this);
    }


    componentWillMount() {
//sessionStorage.setItem("status", '0');
//this.check_members();
        //sessionStorage.setItem("key", '123');

    }

    check_members(){
        const data = new FormData();
        data.append('sql',"select * from member where mb_mail = 'qq@123'")
    
        fetch('http://127.0.0.1/ajax/venus.php', {
            method:'post',
            body:data,
        })
        .then((res) => {
            return res.json();
        }).catch((e)=>{
            console.log(e);})
        .then((res) => {
            this.setState({user: res});
            if(res.length>0){
                localStorage.setItem("status", '1');
            }
            
        }).catch((e)=>{
            console.log(e);
        });
        location.reload();
    }

    logout(){
        localStorage.clear();
        alert('logout');
    }
    

   render() {
      return (
         <div>
            <h2>Login</h2>
            <div className="form-group">
            <input  type="text"/>
            </div>
            <div className="form-group">
            <input  type="password"/>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
            <Link to="/#"><Button onClick={this.check_members}>login</Button></Link>
            {/* <a href="#/login"><Button onClick={this.logout}>logout</Button></a> */}

            
            {/* {sessionStorage.getItem("status")}*/}
            {/* {JSON.stringify(this.state.user)}  */}
         </div>
      );
   }
}
export default Login;



