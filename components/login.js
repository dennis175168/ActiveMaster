import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Table, Well, ButtonGroup, Glyphicon, Image, Nav, NavItem,Tab} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link ,Form, FormGroup, Col ,Checkbox ,ControlLabel ,FormControl } from 'react-router-dom';
import {SqlApi_url} from '../config';
var passwordHash = require('password-hash');


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
        var user = document.getElementById('usr').value;
        var pwd = document.getElementById('pwd').value;

        const data = new FormData();
        data.append('sql',"select * from admin where admin_name = '"+user+"'" )
    
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
            this.setState({user: res});
            var check = passwordHash.verify(pwd , res[0].admin_pwd);
            if(res.length>0 && check == true){
                //alert(JSON.stringify(res[0].admin_id));
                localStorage.setItem("status", '1');
                localStorage.setItem("admin_id", res[0].admin_id);
                window.location.replace('/#');
                location.reload();
            }else{
                //window.location.replace(...)
                console.log(check);
            }
            
        }).catch((e)=>{
            console.log(e);
            alert(user);
        });
    }

    logout(){
        localStorage.clear();
        alert('logout');
    }

    // hash(){
        
        
    //     //var hashedPassword = 'sha1$8aa3cbf5$1$f31ca9539be277a7da35568ac6a1e778cbb6a1c2';//passwordHash.generate('1234');
    //     var hashedPassword = passwordHash.generate('1234');
    //     //alert(passwordHash.verify('222', hashedPassword));
    //     alert(hashedPassword);
    // }
    

   render() {
      return (
         <div>
            <h2>Login</h2>
            <div className="form-group">
                <label for="usr">username:</label>
                <input type="text" className="form-control" id="usr"/>
            </div>
            <div className="form-group">
                <label for="usr">password:</label>
                <input type="password" className="form-control" id="pwd"/>
            </div>
            <Button onClick={this.check_members}>login</Button>
             {/* <Button onClick={this.hash}>123</Button>  */}
            {/* <a href="#/login"><Button onClick={this.logout}>logout</Button></a> */}

            
            {/* {sessionStorage.getItem("status")}*/}
            {/* {JSON.stringify(this.state.user)}  */}
         </div>
      );
   }
}
export default Login;



