import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import { Button, Table, Well, ButtonGroup, Glyphicon, Image, Nav, NavItem, Row, Col, Navbar,  MenuItem,  NavDropdown} from 'react-bootstrap';
import decode from 'jwt-decode';
import session_status from '../config';

import Login from './login';
import Home from './home';
import Point from './point';
import Active from './active';
import Beacon from './beacon';
import Proof from './proof';
import Account from './account';
import Auth from './Auth';




class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
        show: true,
        wid: '90%',
        bt_hover:'#FFFFFF',
        bt_hover_m:'10%'
    };
    this.aa = this.aa.bind(this); //傳遞子物件
    this.b = this.b.bind(this);
    this.b1 = this.b1.bind(this);
  }


    aa(){
        if(this.state.show==true){
            this.setState({show:false});
            this.setState({wid:'100%'});
            this.setState({bt_hover_m:'0'});
        }else{
            this.setState({show:true});
            this.setState({wid:'90%'});
            this.setState({bt_hover_m:'10%'});
        }
    }

    logout(){
        //sessionStorage.setItem("status", '0');
        localStorage.clear();
        alert('logout');
        location.reload();
    }

    b(){
        this.setState({bt_hover:'#2A3542'});
    }
    b1(){
        this.setState({bt_hover:'#FFFFFF'});
    }

   render() {
       const w =this.state.wid;
       const log = localStorage.getItem('status');
       const bt_hover_m = this.state.bt_hover_m;
       const height = window.screen.availHeight;
      return (

        <HashRouter>


        <div style={{alignContent:'center'}}>
            <Navbar  style={{position:'fixed', marginBottom:'0px',  width:'100%'}}>
                <Navbar.Header>
                <Button style={{marginTop:'10px'}} onClick={this.aa}><Glyphicon glyph="	glyphicon glyphicon-th-list" /></Button>
                {/* <Navbar.Brand>
                    <a href="#">Active Master</a>
                </Navbar.Brand> */}
                </Navbar.Header>
                <Nav>
                <NavItem eventKey={1} href="http://www1.cycu.edu.tw/">CYCU 校首頁</NavItem>
                {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4}>Separated link</MenuItem>
                </NavDropdown> */}
                
                </Nav>
            </Navbar>

            <div style={{display: this.state.show ? 'block' : 'none' }} >
            <Well className="aa" style={{position:'fixed',top:'50px',width:'10%',float:'left',marginTop:'30ox', margin:'0px',padding:'0px', justifyContent: 'center', backgroundColor:'#2A3542', height:height}}>
                <Image src="img/1024px-CYCU.svg.png" style={{width:'50%', margin:'30px', marginLeft:'25%', marginRight:'25%'}}/> 
                <h4 style={{color:'white',marginRight:'20px', marginLeft:'20px'}}>Active Master</h4>
                    { log == 1 ? 
                        <Nav style={{paddingTop:"20px"}}>
                            <NavItem href="/" onMouseEnter={this.b} onMouseOut={this.b1}><strong onMouseEnter={this.b} onMouseOut={this.b1} style={{color: this.state.bt_hover}}><Glyphicon glyph="glyphicon glyphicon-home" /> Home</strong></NavItem>
                            <NavItem href="/#/active" onMouseEnter={this.b} onMouseOut={this.b1}><strong onMouseEnter={this.b} onMouseOut={this.b1} style={{color: this.state.bt_hover}}><Glyphicon glyph="	glyphicon glyphicon-th" /> 活動管理</strong></NavItem>
                            <NavItem href="/#/point" onMouseEnter={this.b} onMouseOut={this.b1}><strong onMouseEnter={this.b} onMouseOut={this.b1} style={{color: this.state.bt_hover}}><Glyphicon glyph="	glyphicon glyphicon-copyright-mark" /> 積點管理</strong></NavItem>
                            <NavItem href="/#/proof" onMouseEnter={this.b} onMouseOut={this.b1}><strong onMouseEnter={this.b} onMouseOut={this.b1} style={{color: this.state.bt_hover}}><Glyphicon glyph="glyphicon glyphicon-book" /> 通識認證</strong></NavItem>
                            <NavItem href="/#/account" onMouseEnter={this.b} onMouseOut={this.b1}><strong onMouseEnter={this.b} onMouseOut={this.b1} style={{color: this.state.bt_hover}}><Glyphicon glyph="glyphicon glyphicon-user" /> 帳號管理</strong></NavItem>
                            <NavItem href="/#/beacon" onMouseEnter={this.b} onMouseOut={this.b1}><strong onMouseEnter={this.b} onMouseOut={this.b1} style={{color: this.state.bt_hover}}><Glyphicon glyph="glyphicon glyphicon-record" /> Beacon Device</strong></NavItem>
                            <Link to="/login"><Button bsStyle="danger" style={{width:'80%', margin:'10%'}} onClick={this.logout}>Log out{sessionStorage.getItem('status')}</Button></Link>
                        

                        {/* <Link to="/point"><Button style={{width:'100%'}}>積點管理</Button></Link>
                        <Link to="/active"><Button style={{width:'100%'}}>活動管理</Button></Link>
                        <Link to="/proof"><Button style={{width:'100%'}}>通識認證</Button></Link>
                        <Link to="/account"><Button style={{width:'100%'}}>帳號管理</Button></Link>
                        <Link to="/beacon"><Button style={{width:'100%'}}>Beacon Device</Button></Link>
                        <Link to="/login"><Button bsStyle="danger" style={{width:'100%'}} onClick={this.logout}>Log out</Button></Link> */}
                        </Nav>
                        :
                        <Link  to="/login"><Button  bsStyle="success" style={{width:'100%', width:'80%', margin:'10%'}}>Login123{sessionStorage.getItem('status')}</Button></Link>
                    }
                    {/* <Link to="/"><Button style={{width:'100%'}}>Home</Button></Link>
                    <Link to="/login"><Button style={{width:'100%'}}>Login</Button></Link>
                    <Link to="/point"><Button style={{width:'100%'}}>積點管理</Button></Link>
                    <Link to="/active"><Button style={{width:'100%'}}>活動管理</Button></Link>
                    <Link to="/proof"><Button style={{width:'100%'}}>通識認證</Button></Link>
                    <Link to="/account"><Button style={{width:'100%'}}>帳號管理</Button></Link>
                    <Link to="/beacon"><Button style={{width:'100%'}}>Beacon Device</Button></Link> */}
                    <div>{log}</div>
                
                
            </Well>  
            </div>  
    
         

            <div style={{marginLeft:bt_hover_m, marginTop:'50px',width:w,float:'left',padding:'30px',alignContent:'center'}}>   
          
                <Switch>  
                    <Route exact path="/" component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/point" component={Point}/>
                    <Route path="/active" component={Active}/>
                    <Route path="/proof/:id" component={Proof}/>
                    <Route path="/account" component={Account}/>
                    <Route path="/beacon" component={Beacon}/>
                </Switch>
             
            </div>
          

          
        </div>

        
      </HashRouter>

        


 
      );
   }
}
export default Header;

const styles = {
    bt:{
        backgroundColor:'#FFFFFF'
    },
    bt1:{
        backgroundColor:'black'
    }
}
