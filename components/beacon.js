import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
    Panel,
    Col,
    Row,
    Grid
  } from 'react-bootstrap';
import {SqlApi_url} from '../config';
import Permission from './no_permussion';

class Beacon extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            location:[{
                location_id:'123',
                location_name:'456'
            }],
            beacon:[{
                beacon_id:'',
                beacon_num:''
            }],
            beacon_with_location:[{
                beacon_num:'0',
                location_id:'0',
                _id:'0'
            }],
        };
        this.get_data = this.get_data.bind(this); 
        this.get_beacon_with_location = this.get_beacon_with_location.bind(this); 
        this.setting_device = this.setting_device.bind(this); 
        this.delete_setting = this.delete_setting.bind(this); 
        this.insert_device = this.insert_device.bind(this); 
      }
    
    componentWillMount() {
        this.get_data();
        this.get_beacon();
        this.get_beacon_with_location();
    }

    get_data() {
        const data = new FormData();
        data.append('sql', 'select * from location');

        fetch(SqlApi_url, {
        method: 'post',
        body: data
        }).then((res) => {
        return res.json();
        }).then((res) => {
        this.setState({location: res});
        });
    }

    get_beacon() {
        const data = new FormData();
        data.append('sql', 'SELECT * FROM beacon WHERE beacon_num NOT IN (SELECT beacon_num FROM beaconwithlocation)');

        fetch(SqlApi_url, {
        method: 'post',
        body: data
        }).then((res) => {
        return res.json();
        }).then((res) => {
        this.setState({beacon: res});
        });
    }

    get_beacon_with_location() {
        const data = new FormData();
        data.append('sql', 'select * from BeaconwithLocation , location where location.location_id = BeaconwithLocation.location_id');

        fetch(SqlApi_url, {
        method: 'post',
        body: data
        }).then((res) => {
        return res.json();
        }).then((res) => {
        this.setState({beacon_with_location: res});
        });
    }

    setting_device(){
        
        var location_id = document.getElementById('location').value;
        var beacon_id = document.getElementById('beacon').value;
        var a ="INSERT INTO BeaconwithLocation (location_id, beacon_num) VALUES ('"+location_id+"','"+beacon_id+"')";
        alert("新增關聯");
        const data = new FormData();
        data.append('sql', a);
        
        fetch(SqlApi_url, {
            method:'post',
            body:data,
        })
        .then((res) => {
            //return res.json();

        })
        .then((res) => {
            //this.setState({data: res});
            this.get_beacon_with_location();
        })
    
        
    }
    delete_setting(i){
        alert('delete');
        var _id = i;
        var qq =  "DELETE FROM BeaconwithLocation WHERE _id="+_id;
        const data = new FormData();
        data.append('sql', qq);

        fetch(SqlApi_url, {
            method:'post',
            body:data,
        })
        .then((res) => {
            //return res.json();
        }).catch((e)=>{
          console.log(e);
        })
        .then((res) => {
            //this.setState({data: res});
            this.get_beacon_with_location();
            this.get_beacon();
        }).catch((e)=>{
          console.log(e);
        });
    }

    

    insert_device(){
        var beacon_num = document.getElementById('beacon_num').value;
        const data = new FormData();
        data.append('sql', "INSERT INTO beacon (beacon_num) VALUES ('"+beacon_num+"')");
        alert(beacon_num);
        fetch(SqlApi_url, {
            method:'post',
            body:data,
        })
        .then((res) => {
            //return res.json();
        })
        .catch((e)=>{
          console.log(e);
        })
        .then((res) => {
            //this.setState({data: res});
        })
        .catch((e)=>{
          console.log(e);
        });
    
        this.get_beacon();
    }

    insert_location(){
        alert('ii');
        const data = new FormData();
        data.append('sql', "DELETE FROM BeaconwithLocation WHERE _id="+_id);

        fetch(SqlApi_url, {
            method:'post',
            body:data,
        })
        .then((res) => {
            //return res.json();
        })
        .catch((e)=>{
          console.log(e);
        })
        .then((res) => {
            //this.setState({data: res});
        })
        .catch((e)=>{
          console.log(e);
        });
    
        this.location();
    }


   render() {
       var l =this;
       const log =localStorage.getItem('status');
      return (

        
        <div>
        { log == 1  ?
        <div>
        <Grid style={{width:'100%'}}>
        <Row className="show-grid">
            <Col xs={12} >
            <Well>
            <ButtonGroup  style={{width:'100%'}}>
                <Button onClick={ this.show_all} bsStyle="success" >ALL</Button>
                <Button onClick={ this.show_student} bsStyle="success" >裝置狀態</Button>
                <Button onClick={ this.show_gifts} bsStyle="success" >管理裝置</Button>
              </ButtonGroup>
             </Well>
            </Col>
        </Row>
        <Row className="show-grid">
            <Col xs={12} >
            <Well>
             <Panel header="裝置設定" >
             {/* {JSON.stringify(this.state.beacon_with_location)} */}
                <Table
                style={{
                background: '#FFFFFF',
                display: this.state.showdata,
                }}
                striped
                bordered
                hover>
                    <thead>
                        <tr style={{width:'100%'}}>
                            <th style={{width:'5%'}}>#</th>
                            <th style={{width:'50%'}}>大樓名稱</th>
                            <th style={{width:'1000px'}}>Beacon編號</th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.beacon_with_location.map(function (object, i) {
                            return (
                            <tr key={i} >
                                <td style={{width:'5%'}}>{object._id}</td>
                                <td style={{width:'40%'}}>{(object.location_name)}</td>
                                <td style={{width:'30%'}}>{(object.beacon_num)}</td>
                                <td style={{width:'5%'}}><Button style={{width:'100%'}} onClick={()=>l.delete_setting(object._id)} bsStyle="danger" >delete</Button></td>
                            </tr>
                            );
                        })}
                        {/* {row} */}
                    </tbody>
                </Table>
             </Panel>
             </Well>
            </Col>
        </Row>
         <Row className="show-grid">
            <Col md={6} mdPush={6}>
             <Well>
             <Panel header="裝置設定" >
                    <div className="form-group">
                    <label for="sel1">選擇大樓</label>
                    <select className="form-control" id="location">
                        {this.state.location.map(function (object, i) {
                                return (
                                    <option value={object.location_id}>{object.location_name}</option>
                                );
                            })}
                    </select>
                    </div>

                    <div className="form-group">
                    <label for="sel1">選擇裝置編號</label>
                    <select className="form-control" id="beacon">
                        {this.state.beacon.map(function (object, i) {
                            return (
                                <option value={object.beacon_num}>{object.beacon_num}</option>
                            );
                        })}
                    </select>
                    </div>
                    <Button bsStyle="success" onClick={this.setting_device} >確認設置 </Button>
             </Panel>
             </Well>
             </Col>
             

             <Col md={6} mdPull={6}>
             <Well>
             <Panel header="新增大樓" >
             <div className="form-group">
                <label for="usr">大樓名稱:</label>
                <input type="text" className="form-control" id="location_name"/>
             </div>
             <Button>新增</Button>
             </Panel>
             </Well>
             </Col>

             <Col md={6} mdPull={6}>
             <Well>
             <Panel header="新增Beacon裝置" >
             <div className="form-group">
                <label for="usr">裝置編號:</label>
                <input type="text"  className="form-control" id="beacon_num"/>
             </div>
             <Button onClick={this.insert_device}>新增</Button>
             </Panel>
             </Well>
             </Col>

             
             

         </Row>
         </Grid>
         </div>
            
            :
            
            <Permission/>
            
          }
         </div>   
         
      );
   }
}
export default Beacon;