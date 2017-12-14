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
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
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
              <ListGroupItem>管理員: {this.state.admin[0].admin_name}  歡迎使用 ActiveMaster 後臺系統 </ListGroupItem>
              
            </ListGroup>
              
            </Well>

            <Grid style={{width:'100%'}}>

              <Row className="show-grid">
                <Col xs={6} md={3}>
                <Well>
                  <table style={{width:'100%'}}>
                    <tr>
                      <td style={{width:'60%'}}><h3>活動數量</h3></td>
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
                <Well>
                  <BarChart width={600} height={300} data={data}
                    margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                    <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                  </BarChart>                
                </Well>
                </Col>

                <Col xs={6} md={6}>
                <Well>
                <PieChart width={800} height={400}>
                  <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
                  <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
                  <Tooltip/>
                </PieChart>
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
