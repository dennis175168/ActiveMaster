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
                beacon_id:'',
                beacon_num:''
            }],
        };
        this.get_data = this.get_data.bind(this); 
        
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
        data.append('sql', 'select * from beacon');

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

   render() {
      return (

        
        <div>
        <Grid style={{width:'100%'}}>
        <Row className="show-grid">
            <Col xs={12} >
            <Well>
            <ButtonGroup  style={{width:'100%'}}>
                <Button onClick={ this.show_all} bsStyle="success" >ALL</Button>
                <Button onClick={ this.show_student} bsStyle="success" >裝置狀態</Button>
                <Button onClick={ this.show_gifts}bsStyle="success" >管理裝置</Button>
              </ButtonGroup>
             </Well>
            </Col>
        </Row>
        <Row className="show-grid">
            <Col xs={12} >
            <Well>
             <Panel header="裝置設定" >
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.beacon_with_location.map(function (object, i) {
                            return (
                            <tr key={i} >
                                <td style={{width:'5%'}}>{i}</td>
                                <td style={{width:'50%'}}>{(object.location_name)}</td>
                                <td style={{width:'15%'}}>{(object.beacon_num)}</td>
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
                    <select className="form-control" id="sel1">
                        {this.state.location.map(function (object, i) {
                                return (
                                    <option>{object.location_name}</option>
                                );
                            })}
                    </select>
                    </div>

                    <div className="form-group">
                    <label for="sel1">選擇裝置編號</label>
                    <select className="form-control" id="sel1">
                        {this.state.beacon.map(function (object, i) {
                            return (
                                <option>{object.beacon_num}</option>
                            );
                        })}
                    </select>
                    </div>
             </Panel>
             </Well>
             </Col>
             

             <Col md={6} mdPull={6}>
             <Well>
             <Panel header="新增大樓" >
             <div className="form-group">
                <label for="usr">大樓名稱:</label>
                <input type="text" className="form-control" id="usr"/>
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
                <input type="text" className="form-control" id="usr"/>
             </div>
             <Button>新增</Button>
             </Panel>
             </Well>
             </Col>

             
             

         </Row>
         </Grid>
         </div>   
         
      );
   }
}
export default Beacon;