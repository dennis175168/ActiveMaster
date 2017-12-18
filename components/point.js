import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import QrReader from 'react-qr-reader';
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
  Grid,
  Label
} from 'react-bootstrap';
import {SqlApi_url} from '../config';
import Pictures from './pictures';


class Point extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data:[{
            mb_id:'123',
            mb_name:'456'
        }],
        students:[{
          stu_id:'123',
          stu_num:'456',
          stu_name:'456',
          stu_point:'456',
        }],
        student_of_gift:[{
          stu_name:'',
          stu_point:'',
          gift_name:''
        }],
        student_of_gift_qrcode:[{
          stu_name:'',
          stu_point:'',
          gift_name:''
        }],
        change: 'none',
        student: 'block',
        gifts: 'none',

        delay: 300,
        result: 'No result',
    };
    this.insert = this.insert.bind(this); //傳遞子物件
    this.get_data = this.get_data.bind(this);
    this.get_student = this.get_student.bind(this);
    this.get_student_gift = this.get_student_gift.bind(this);
    this.get_student_gift_qrcode = this.get_student_gift_qrcode.bind(this);

    this.update = this.update.bind(this);
    this.show_change = this.show_change.bind(this);
    this.show_gifts = this.show_gifts.bind(this);
    this.show_student = this.show_student.bind(this);
    this.show_all = this.show_all.bind(this);

    this.handleScan = this.handleScan.bind(this)
  }



  componentWillMount(){
    //alert('123');
    this.get_data();
    this.get_student();
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

  get_student(){
    const data = new FormData();
    data.append('sql','select * from student')

    fetch(SqlApi_url, {
        method:'post',
        body:data,
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        this.setState({students: res});
    });
  }

  get_student_gift(){
    var i = document.getElementById('insert_stu_num').value;
    alert(i);
    const data = new FormData();
    data.append('sql','select * from student , gift_box ,gift where student.stu_id = gift_box.stu_id and gift.gift_id = gift_box.gift_id and student.stu_id = '+i)

    fetch(SqlApi_url, {
        method:'post',
        body:data,
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        this.setState({student_of_gift: res});
    });
  }

  get_student_gift_qrcode(){
    var i = document.getElementById('qrcode_result').value;
    alert(i);
    const data = new FormData();
    data.append('sql','select * from student , gift_box ,gift where student.stu_id = gift_box.stu_id and gift.gift_id = gift_box.gift_id and student.stu_id = '+i)

    fetch(SqlApi_url, {
        method:'post',
        body:data,
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        this.setState({student_of_gift: res});
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

  exchange_gift(i){
    alert(i);
    this.update("UPDATE gift_box SET used = 'T' WHERE gift_box_id ="+i);
  }

  update(i) {
    const data = new FormData();
    data.append('sql', i);

    fetch(SqlApi_url, {
      method: 'post',
      body: data
    }).then((res) => {
      //return res.json();
    }).catch((e) => {
      console.log(e);
    }).then((res) => {
      //this.setState({data: res});
      this.get_data();
    }).catch((e) => {
      console.log(e);
    });

    this.get_data();
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

  delete_gift(i){
    var r = confirm("確定刪除");
    if (r == true) {
        this.delete(i);
    } else {
        alert('Cancel the delete');
    }
  }

  update_gift(i){
    const new_price = document.getElementById(i).value;
    if(new_price){
      const sql = "UPDATE gift SET gift_coin = "+new_price+" WHERE gift_id ="+i;
      var r = confirm("確定刪除"+new_price+sql);
      if (r == true) {
          this.update(sql);
      } else {
          alert('Cancel the update');
      }
    }else{
      alert('請先輸入更改內容');
    }
    
  }

  delete(i){
    alert('delete');
    var _id = i;
    var qq =  "DELETE FROM gift WHERE gift_id="+_id;
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
        this.get_data();
    }).catch((e)=>{
      console.log(e);
    });
  }

  handleScan(data){
    if(data){
      this.setState({
        result: data,
      })
    }
  }
  handleError(err){
    console.error(err)
  }


   render() {
     var l =this;
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
                  {this.state.students.map(function(object, i){
                    return (
                      <tr>
                        <td>{object.stu_num}</td>
                        <td>{object.stu_id}</td>
                        <td>{object.stu_point}</td>
                      </tr>  
                    );
                  })}
                  
              </tbody>
            </Table>
            </Panel>
            </Well>

            <Well style={{display:this.state.gifts}}>
              <Panel header="基點禮物" bsStyle="primary">
              <Panel fill collapsible defaultExpanded ={false} header="新增禮物">
                  
                  
              <ListGroup fill>
                  <ListGroup>
                  <Pictures/>
                    {/* <ListGroupItem>
                      <label style={{width:'10%'}}>輸入禮物名稱: </label>
                      <input type="text"  className="form-control" id="usr"/>
                    </ListGroupItem>
                    <ListGroupItem>
                      <label style={{width:'10%'}}>輸入禮物點數: </label>
                      <input type="text"  className="form-control" id="usr"/>
                    </ListGroupItem>
                    <ListGroupItem>
                      <label>選擇禮物圖片: </label>
                      <div><Pictures/></div>
                    </ListGroupItem> */}
                  </ListGroup>
              </ListGroup>

              </Panel>
                <Row className="show-grid">

                {this.state.data.map(function (object, i) {
                      return <Col xs={6} md={3}>
                      <Panel  header={object.gift_name}>
                      <div style={{height:'300px'}} ><img style={{width:'80%', marginLeft:'10%', marginRight:'10%'}} src={object.gift_pic}/></div>
                        

                        <ListGroup fill>
                          <ListGroupItem>
                          <div className="form-group">
                              <label for="usr">點數: {object.gift_coin}</label>
                              <input type="text"  placeholder={object.gift_coin} className="form-control" id={object.gift_id}/>
                          </div>
                            <Button onClick={()=>l.update_gift(object.gift_id)} bsStyle="primary" style={{width:'40%',margin:'5%'}}>update</Button>
                            <Button onClick={()=>l.delete_gift(object.gift_id)} bsStyle="danger" style={{width:'40%' ,margin:'5%'}}>delete</Button>
                          </ListGroupItem>
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
            <Panel fill collapsible defaultExpanded ={false} header="學號查詢">
              <ListGroup fill>
                  <ListGroup>
                    <ListGroupItem>
                      <div className="form-group">
                        <label style={{width:'10%'}}>輸入學生學號: </label>
                        <input type="text"  className="form-control" id="insert_stu_num"/>
                      </div>
                      <Button onClick={this.get_student_gift}>查詢</Button>
                    </ListGroupItem>
                  </ListGroup>
              </ListGroup>
            </Panel>
            <Panel fill collapsible defaultExpanded ={false} header="QRcode查詢">
              <ListGroup fill>
                    <ListGroupItem>
                      <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: '30%' , marginLeft:'35%',marginRight:'35%'}}
                        />
                      <ListGroupItem>
                        <h3><label>學號: {this.state.result}</label></h3>
                      </ListGroupItem>
                      
                      <input type="hidden" value={this.state.result} id="qrcode_result"/>
                      <ListGroupItem>
                        <Button onClick={this.get_student_gift_qrcode}>查詢</Button>
                      </ListGroupItem>
                      
                    </ListGroupItem>
              </ListGroup>
            </Panel>

            <Panel fill collapsible defaultExpanded ={true} header="可兌換禮物">
              <ListGroup fill>
                <ListGroupItem>
                <Row className="show-grid">
                       {
                        this.state.student_of_gift[0].stu_name == '' ?
                        <Label>尚無資料</Label>
                        :
                        this.state.student_of_gift.map(function(object, i){
                          return(
                            
                            <Col xs={6} md={3}>
                              <Panel header={object.gift_name}>
                              <div style={{height:'300px'}} ><img style={{width:'80%', marginLeft:'10%', marginRight:'10%'}} src={object.gift_pic}/></div>
                                <ListGroup fill>
                                  <ListGroupItem>
                                  <div className="form-group">
                                      <label for="usr">點數:{object.gift_coin}</label>
                                  </div>
                                  {object.used == 'T' ?
                                    <Button bsStyle="warning" disabled style={{width:'100%'}}>已使用</Button>
                                  :
                                    <Button bsStyle="primary"  onClick={()=>l.exchange_gift(object.gift_box_id)} style={{width:'100%'}}>兌換</Button>
                                  }
                                    {/* <Button bsStyle="primary" onClick={()=>l.exchange_gift(object.gift_box_id)} style={{width:'100%'}}>兌換</Button> */}
                                  </ListGroupItem>
                                </ListGroup>
                              </Panel>
                            </Col> 
                            
                          );
                        })
                      } 
                </Row>
                </ListGroupItem>
              </ListGroup>
            </Panel>
            </Panel>
            </Well>
            
         </div>
      );
   }
}
export default Point;
