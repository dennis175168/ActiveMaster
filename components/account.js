import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImagesUploader from 'react-images-uploader';
import {SqlApi_url} from '../config';
var passwordHash = require('password-hash');
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

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            admin:[{
                admin_id:'123',
                admin_name:'456'
            }],
        };

        this.get_admin = this.get_admin.bind(this); //傳遞子物件
    //     this.get_data = this.get_data.bind(this);
    //     this.show_change = this.show_change.bind(this);
    //     this.show_gifts = this.show_gifts.bind(this);
    //     this.show_student = this.show_student.bind(this);
    //     this.show_all = this.show_all.bind(this);
    }

    componentWillMount(){
        this.get_admin();
    }

    get_admin(){
        const data = new FormData();
        data.append('sql','select * from admin')

        fetch(SqlApi_url, {
            method:'post',
            body:data,
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            this.setState({admin: res});
        });
    }

    insert_admin(){
        var insert_mail = document.getElementById('insert_mail').value;
        var insert_name = document.getElementById('insert_name').value;
        var insert_phone = document.getElementById('insert_phone').value;
        var insert_pwd = document.getElementById('insert_pwd').value;
        var insert_active_name = document.getElementById('insert_active_name').value;
        var insert_level = document.getElementById('insert_level').value;
        alert(insert_pwd);
    }
    

   render() {
    if (typeof window === 'undefined') {
        options.userAgent = this.props.userAgentString;
      }
      return (
         <div>
            <Well>
                <Panel  header="人員管理" bsStyle="primary">
                
                

                <Panel fill collapsible defaultExpanded ={true} header="所有人員">
                    <Table responsive hover striped bordered>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>帳號</th>
                        <th>信箱</th>
                        <th>使用者</th>
                        <th>聯絡電話</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {this.state.admin.map(function(object, i){
                            return (
                            <tr>
                            <td>{object.admin_id}</td>
                            <td>{object.admin_name}</td>
                            <td>{object.admin_mail}</td>
                            <td>{object.name}</td>
                            <td>{object.phone}</td>
                            </tr>);
                        })}
                    </tbody>
                </Table>
                </Panel>

                <Panel fill collapsible defaultExpanded ={false} header="較高權限人員" bsStyle="danger">
                    <ListGroup fill>
                        <ListGroup>
                            <ListGroupItem>
                            <Grid>
                                <Row className="show-grid">
                                {this.state.admin.map(function(object, i){
                                    return(
                                        <Col xs={6} md={4}>
                                        <Panel  header={object.admin_name}>
                                            {/* <div style={{height:'300px'}} ><img style={{width:'80%', marginLeft:'10%', marginRight:'10%'}} src={object.gift_pic}/></div> */}
                                            <ListGroup fill>
                                                <ListGroupItem>
                                                <div className="form-group">
                                                    <label for="usr">姓名 :{object.name}</label>
                                                </div>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                <div className="form-group">
                                                    <label for="usr">信箱 :{object.admin_mail}</label>
                                                </div>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                <div className="form-group">
                                                    <label for="usr">連絡電話 :{object.phone}</label>
                                                </div>
                                                </ListGroupItem>
                                                <ListGroupItem><Button bsStyle="danger" style={{width:'100%'}}>delete</Button></ListGroupItem>
                                            </ListGroup>
                                        </Panel>
                                        </Col>
                                    );
                                })}
                                    
                                </Row>
                            </Grid>
                            </ListGroupItem>
                        </ListGroup>
                    </ListGroup>
                </Panel>

                <Panel fill collapsible defaultExpanded ={false} header="一般權限" bsStyle="warning">
                    <ListGroup fill>
                        <ListGroup>
                            <ListGroupItem>
                            <div className="form-group">
                                <label style={{width:'10%'}}>輸入學生學號: </label>
                                <input type="text"  className="form-control" id="insert_stu_num"/>
                            </div>
                            <Button >查詢</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </ListGroup>
                </Panel>

                <Panel fill collapsible defaultExpanded ={false} header="較低權限" bsStyle="success">
                    <ListGroup fill>
                        <ListGroup>
                            <ListGroupItem>
                            <div className="form-group">
                                <label style={{width:'10%'}}>輸入學生學號: </label>
                                <input type="text"  className="form-control" id="insert_stu_num"/>
                            </div>
                            <Button >查詢</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </ListGroup>
                </Panel>

                <Panel fill collapsible defaultExpanded ={false} header="新增人員">
                    <ListGroup fill>
                        <ListGroup>
                            <ListGroupItem>
                            <div className="form-group">
                                <label style={{width:'10%'}}>信箱: </label>
                                <input type="mail"  className="form-control" id="insert_mail"/>
                            </div>
                            <div className="form-group">
                                <label style={{width:'10%'}}>管理人: </label>
                                <input type="text"  className="form-control" id="insert_name"/>
                            </div>
                            <div className="form-group">
                                <label style={{width:'10%'}}>管理人電話: </label>
                                <input type="text"  className="form-control" id="insert_phone"/>
                            </div>
                            <div className="form-group">
                                <label style={{width:'10%'}}>帳號: </label>
                                <input type="text"  className="form-control" id="insert_active_name"/>
                            </div>
                            <div className="form-group">
                                <label style={{width:'10%'}}>密碼: </label>
                                <input type="password"  className="form-control" id="insert_pwd"/>
                            </div>
                            </ListGroupItem>
                            <ListGroupItem>
                            <div className="form-group">
                                <label for="sel1">Select list:</label>
                                <select className="form-control" id="insert_level">
                                <option value="1">較高</option>
                                <option value="2">一般</option>
                                <option value="3">較低</option>
                                </select>
                            </div>
                            <Button onClick={this.insert_admin}>確認新增</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </ListGroup>
                </Panel>
                   
                </Panel>
            </Well>
         </div>
      );
   }
}
export default Account;