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
  Panel,
  Col,
  Row,
} from 'react-bootstrap';
import {SqlApi_url} from '../config';


class Point extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data:[{
            mb_id:'123',
            mb_name:'456'
        }],
        change: 'block',
        student: 'block',
        gifts: 'block',
    };
    this.insert = this.insert.bind(this); //傳遞子物件
    this.get_data = this.get_data.bind(this);
    this.show_change = this.show_change.bind(this);
    this.show_gifts = this.show_gifts.bind(this);
    this.show_student = this.show_student.bind(this);
    this.show_all = this.show_all.bind(this);
  }



  componentWillMount(){
    //alert('123');
    this.get_data();
  }

  get_data(){
    const data = new FormData();
    data.append('sql','select * from gift')

    fetch(SqlApi_url, {
        method:'post',
        body:data,
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        this.setState({data: res});
    });
  }

  show_student(){
    this.setState({
      student:'block',
      gifts:'none',
      change:'none'
    })
  }
  show_gifts(){
    this.setState({
      student:'none',
      gifts:'block',
      change:'none'
    })
  }
  show_change(){
    this.setState({
      student:'none',
      gifts:'none',
      change:'block'
    })
  }
  show_all(){
    this.setState({
      student:'block',
      gifts:'block',
      change:'block'
    })
  }

  insert(){
    const data = new FormData();
    data.append('sql',"INSERT INTO member (mb_name , mb_mail ) VALUES ('allen', 'allen.chen@msseed.idv.tw')");

    fetch('http://127.0.0.1/ajax/venus.php', {
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

    this.get_data();
    //alert(123);

  }


   render() {
     //this.aa();
     const info = this.state.data;
     const row = [];
     for(var i=0; i<=this.state.data.length-1; i++){
      row.push(
       <tr>
       <td>{info[i].mb_id}</td>
       <td>{info[i].mb_name}</td>
       <td>{info[i].mb_pwd}</td>
       <td>{info[i].mb_mail}</td>
      </tr>
      )
    }
      return (
        
         <div>
           <Well>
           <div >
              <ButtonGroup  style={{width:'100%'}}>
                <Button onClick={ this.show_all} bsStyle="success" >ALL</Button>
                <Button onClick={ this.show_student} bsStyle="success" >學生積點</Button>
                <Button onClick={ this.show_gifts}bsStyle="success" >積點禮物</Button>
                <Button onClick={ this.show_change} bsStyle="success" >兌換禮物</Button>
              </ButtonGroup>
              </div>
           </Well>
            
            
            
            
            
            <Well style={{display:this.state.student}}>
            <Panel header="學生積點" bsStyle="primary">
            <Table responsive hover striped bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>學號</th>
                  <th>點數</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>10344129</td>
                  <td>66666</td>
                </tr>
              </tbody>
            </Table>
            </Panel>
            </Well>

            <Well style={{display:this.state.gifts}}>
            <Panel header="基點禮物" bsStyle="primary">
            <Panel fill collapsible defaultExpanded ={false} header="新增禮物">
                
                
            <ListGroup fill>
                <ListGroup>
                  <ListGroupItem>
                    <label style={{width:'10%'}}>輸入禮物名稱: </label>
                    <input type="text"  className="form-control" id="usr"/>
                  </ListGroupItem>
                  <ListGroupItem>
                    <label style={{width:'10%'}}>輸入禮物點數: </label>
                    <input type="text"  className="form-control" id="usr"/>
                  </ListGroupItem>
                  <ListGroupItem>
                    <label>選擇禮物圖片: </label>
                    <input type="file"/>
                  </ListGroupItem>
                </ListGroup>
            </ListGroup>
            </Panel>
              <Row className="show-grid">

              {this.state.data.map(function (object, i) {
                    return <Col xs={6} md={3}>
                    <Panel collapsible defaultExpanded header={object.gift_name}>
                      <img style={{width:'100%'}} src={object.gift_pic}/>

                      <ListGroup fill>
                        <ListGroupItem>
                        <div className="form-group">
                            <label for="usr">點數:</label>
                            <input type="text" value={object.gift_coin} className="form-control" id="usr"/>
                        </div>
                          <Button bsStyle="primary" style={{width:'100%'}}>update</Button>
                        </ListGroupItem>
                        <ListGroupItem><Button bsStyle="danger" style={{width:'100%'}}>delete</Button></ListGroupItem>
                      </ListGroup>
                    </Panel>
                  </Col> ;
              })}
                  {/* <Col xs={6} md={4}>
                    <Panel collapsible defaultExpanded header={this.state.data[0].gift_name}>
                      <img style={{width:'100%'}} src={this.state.data[0].gift_pic}/>

                      <ListGroup fill>
                        <ListGroupItem><input type="text" value={this.state.data[0].gift_coin}/><Button bsStyle="primary">update</Button></ListGroupItem>
                        <ListGroupItem><Button bsStyle="danger">delete</Button></ListGroupItem>
                      </ListGroup>
                    </Panel>
                  </Col>  */}
              </Row>
            </Panel>
            </Well>

            <Well style={{display:this.state.change}}>
            <Panel header="兌換禮物" bsStyle="primary">
            </Panel>
            </Well>
            
         </div>
      );
   }
}
export default Point;
