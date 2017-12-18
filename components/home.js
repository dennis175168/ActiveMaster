import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import {SqlApi_url} from '../config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  PieChart, Pie, Sector, Cell } from 'recharts';
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
  OverlayTrigger,
  Tabs,
  ListGroup,
  ListGroupItem,
  Panel,
  Grid,
  Row,
  Col,
  Label
} from 'react-bootstrap';
import Login from './login';
import Chart from './chart';
import BarActive from './chart/bar_active';
import MyPie from './chart/pie';
import MyProofRadar from './chart/radar';
import MyArea from './chart/area';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        admin:[{
          admin_id:'123',
          admin_name:'456'
        }],
        beacon_count:[{
          admin_id:'123',
          admin_name:'456'
        }],
        endside_picture:[{
          pic_id:'123',
          pic_name:'456',
          pic_type_id:'456'
        }],
        active:[{
          active_id:'123',
        }],
        
    };
    this.get_admin = this.get_admin.bind(this); //傳遞子物件
    // this.get_data = this.get_data.bind(this);
  }



  componentWillMount(){
    this.get_admin();
    this.get_beacon();
    this.get_endside_picture();
    this.get_active();
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
        //alert(user);
    });
  }
  get_beacon(){
    const admin_id = localStorage.getItem('admin_id');

    const data = new FormData();
    data.append('sql',"SELECT * FROM beacon WHERE beacon_num NOT IN (SELECT beacon_num FROM beaconwithlocation)" )

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
        this.setState({beacon_count: res});
    }).catch((e)=>{
        console.log(e);
    });
  }

  get_endside_picture(){
    const data = new FormData();
    data.append('sql','select * from endside_picture where pic_type_id = 1');

    fetch(SqlApi_url, {
        method:'post',
        body:data,
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        this.setState({endside_picture: res});
    });
  }
  get_active() {
    const data = new FormData();
    data.append('sql', 'select * from active');

    fetch(SqlApi_url, {
      method: 'post',
      body: data
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({active: res});
    });
  }

 


   render() {
     const admin_id = localStorage.getItem('admin_id');
     //this.aa();
     const log =localStorage.getItem('status');

     const data = [
      {'name': '音樂', 'uv': '4000'},
      {'name': '電影', 'uv': '3000'},
      {'name': '舞蹈', 'uv': '2000'},
      {'name': '講座', 'uv': '2780'},
      {'name': '其他', 'uv': '1890'},
    ];
    const data01 = [{name: 'Group A', value: 10}, {name: 'Group B', value: 300},
                    {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
                    {name: 'Group E', value: 278}, {name: 'Group F', value: 189}]

                   

    const data02 = [{name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
                    {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
                    {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}];
    const aaa = this.state.beacon_count;
    
    
    
      return (
        <div>
          { log == 1  ?
            <div>
            <Well>
              <h2>Dashboard</h2>
            </Well>
            <Well>
            <ListGroup>
              <ListGroupItem bsStyle="success">管理員: {this.state.admin[0].admin_name}  歡迎使用 ActiveMaster 後臺系統 </ListGroupItem>
              
            </ListGroup>
              
            </Well>

            <Grid style={{width:'100%'}}>

              <Row className="show-grid">
                <Col xs={6} md={3}>
                <Well>
                  <table style={{width:'100%'}}>
                    <tr>
                      <td style={{width:'60%'}}><h3>本月活動數量</h3></td>
                      <td style={{width:'40%'}}><h1 style={{marginLeft:'10px'}}><strong>{JSON.stringify(this.state.active.length)}</strong></h1></td>
                    </tr>
                  </table>                  
                </Well>
                </Col>

                <Col xs={6} md={3}>
                <Well>
                  <table style={{width:'100%'}}>
                    <tr>
                      <td style={{width:'60%'}}><h3>管理員數量</h3></td>
                      <td style={{width:'40%'}}><h1 style={{marginLeft:'10px'}}><strong>2</strong></h1></td>
                    </tr>
                  </table> 
                </Well>
                </Col>

                <Col xs={6} md={3}>
                <Well>
                  <table style={{width:'100%'}}>
                    <tr>
                      <td style={{width:'60%'}}><h3>Banner圖片數量</h3></td>
                      <td style={{width:'40%'}}><h1 style={{marginLeft:'10px'}}><strong>{JSON.stringify(this.state.endside_picture.length)}</strong></h1></td>
                    </tr>
                  </table> 
                </Well>
                </Col>

                <Col xs={6} md={3}>
                <Well>
                  <table style={{width:'100%'}}>
                    <tr>
                      <td style={{width:'60%'}}><h3>Beacon<br/>剩餘數量</h3></td>
                      <td style={{width:'40%'}}><h1 style={{marginLeft:'10px'}}><strong>{(this.state.beacon_count.length)}</strong></h1></td>
                    </tr>
                  </table> 
                </Well>
                </Col>
              </Row>

              <Row className="show-grid">
                <Col xs={6} md={6}>
                  <ListGroupItem>
                    學生喜愛活動分布
                  </ListGroupItem>
                <Well>
                  <Chart />   
                </Well>
                </Col>

                <Col xs={6} md={6}>
                  <ListGroupItem>
                    活動數量分布
                  </ListGroupItem>
                  <Well>
                    <BarActive/>
                  </Well>
                </Col>
              </Row>

              <Row className="show-grid">

                <Col xs={6} md={3}>
                  <ListGroupItem>
                    大四學生喜愛活動分布
                  </ListGroupItem>
                  <Well>
                  <MyPie/>
                  </Well>
                </Col>
                <Col xs={6} md={3}>
                  <ListGroupItem>
                    大三學生喜愛活動分布
                  </ListGroupItem>
                  <Well>
                  <MyPie/>
                  </Well>
                </Col>
                <Col xs={6} md={3}>
                  <ListGroupItem>
                    大二學生喜愛活動分布
                  </ListGroupItem>
                  <Well>
                  <MyPie/>
                  </Well>
                </Col>
                <Col xs={6} md={3}>
                  <ListGroupItem>
                    大一學生喜愛活動分布
                  </ListGroupItem>
                  <Well>
                  <MyPie/>
                  </Well>
                </Col>
              </Row>

              <Row className="show-grid">
                <Col xs={6} md={6}>
                  <ListGroupItem>
                    學生參與通識活動分布
                  </ListGroupItem>
                <Well>
                  <MyProofRadar />   
                </Well>
                </Col>

                <Col xs={6} md={12}>
                  <ListGroupItem>
                    所有活動分布
                  </ListGroupItem>
                <Well>
                  <MyArea />   
                </Well>
                </Col>
              </Row>

            </Grid>
            
            </div>
            
            :
            
            <h2>error</h2>
            
          }
        </div>   

         

        
      );
   }
}


export default Home;
