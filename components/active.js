import React, {Component} from 'react';
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
  Grid,
} from 'react-bootstrap';
import {SqlApi_url} from '../config';
import Proof from './proof';

class Active extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          active_id: '123',
          active_name: '456'
        }
      ],
      detail_data: [
        {
          active_id: '123',
          active_name: '456'
        }
      ],
      showModal: 'none',
      showdata: 'block'
    };

    this.insert = this.insert.bind(this); //傳遞子物件
    this.get_data = this.get_data.bind(this);
    this.detail = this.detail.bind(this);
    this.all = this.all.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hito = this.hito.bind(this);
    this.cancel_hito = this.cancel_hito.bind(this);
    this.update = this.update.bind(this);
  }

  componentWillMount() {
    //alert('123');
    this.get_data();
  }

  get_data() {
    const data = new FormData();
    data.append('sql', 'select * from active');

    fetch(SqlApi_url, {
      method: 'post',
      body: data
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({data: res});
    });
  }

  select_data_type(j) {
    //alert(j);
    const data = new FormData();
    data.append('sql', 'select * from active where active_type_id = '+j);

    fetch(SqlApi_url, {
      method: 'post',
      body: data
    }).catch((e) => {
      alert(e);
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({data: res});
    }).catch((e) => {
      console.log(e);
    });
  }

  insert() {
    const data = new FormData();
    data.append('sql', "INSERT INTO member (mb_name , mb_mail ) VALUES ('allen', 'allen.chen@msseed.idv." + "tw')");

    fetch('http://127.0.0.1/ajax/venus.php', {
      method: 'post',
      body: data
    }).then((res) => {
      //return res.json();
    }).catch((e) => {
      console.log(e);
    }).then((res) => {
      //this.setState({data: res});
    }).catch((e) => {
      console.log(e);
    });

    this.get_data();
    //alert(123);

  }

  handleChange(event){
    //this.setState({value: event.target.value});
    const k = event.target.value
    //alert(k);

    const data = new FormData();
    data.append('sql', "select * from active where active_name like '%"+k+"%'");
    fetch(SqlApi_url, {
      method: 'post',
      body: data
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({data: res});
    });
  }

  hito(){
    for(var j=0; j<=this.state.data.length-1;j++){
      const sta = document.getElementById(j).checked;
      if(sta == true){
        console.log(this.state.data[j].active_id+": 有按過");

        this.update("UPDATE active SET hot='T' WHERE active_id ="+this.state.data[j].active_id);
        this.get_data();
      }else{
        console.log(this.state.data[j].active_name+": 沒按過");
      }
      
    }
  }

  cancel_hito(i){
    this.update("UPDATE active SET hot='F' WHERE active_id ="+i);
    this.get_data();
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

  detail(i) {
    //alert(i);
    this.setState({detail: i, showModal: 'block', showdata: 'none'})
    const data1 = new FormData();
    data1.append('sql', 'select * from active where active_id = ' + i)

    fetch(SqlApi_url, {
      method: 'post',
      body: data1
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({detail_data: res});
    });
  }

  all() {
    this.setState({showModal: 'none', showdata: 'block'})
  }

  update_detail(col, html_id ,i){
    var con = document.getElementById(html_id).value;
    if(con ==null || con == ""){
      alert('請輸入內容');
    }else{
      //alert("UPDATE active SET "+col+" = '"+con+"' WHERE active_id ="+i);
      this.update("UPDATE active SET "+col+" = '"+con+"' WHERE active_id ="+i);
    }
    
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


  render() {
    const l = this;

    const info = this.state.data;
    const row = [];
    for (var i = 0; i <= this.state.data.length - 1; i++) {

      row.push(

        <tr onClick={() => l.detail(info[i].active_id)}>
          {/* <td>{info[i].active_id}</td> */}
          <td style={{width:'5%'}}>{info[i].active_name}</td>
          <td style={{width:'50%'}}>{info[i].location}</td>
          <td style={{width:'15%'}}>{info[i].depart}</td>
          {/* <td><img style={{width:'100px'}} src={info[i].active_pic}/></td> */}
        </tr>
      )
    }
    var newState = {};
    for (var i = 0; i <= this.state.data.length - 1; i++) {
      newState[i] = true;
    }
    //this.setState(newState);

    var html = this.state.detail_data[0].active_info;
    var div = document.createElement("div");
    div.innerHTML = html;
    var text = div.textContent || div.innerText || "";

    var check;
    if(info.hot == 'T'){
      check = (
        <input id={i}  className="form-control " type="text"/>
      )
    }else{
      check = (
        <input id={i}  className="form-control " type="checkbox"/>
      )
    }
    var th =this;

    

    return (

      <div>
        <Well >
        <Row className="show-grid">
        <Col xs={12} md={8} >
          <ButtonGroup  style={{width:'100%'}}>
                <Button bsStyle="success" onClick={()=>this.get_data()}>All</Button>
                <Button bsStyle="success" onClick={()=>this.select_data_type(1)}>音樂</Button>
                <Button bsStyle="success" onClick={()=>this.select_data_type(2)}>電影</Button>
                <Button bsStyle="success" onClick={()=>this.select_data_type(3)}>舞蹈/戲劇</Button>
                <Button bsStyle="success" onClick={()=>this.select_data_type(4)}>講座</Button>
                <Button bsStyle="success" onClick={()=>this.select_data_type(5)}>其他</Button>    
          </ButtonGroup>
        </Col>
        <Col xs={6} md={4} >
          <input type="text" className="form-control" placeholder="search" value={this.state.value} onChange={this.handleChange}/>
          
        </Col>  
        </Row>
          

        </Well>
        <Well >
          <Panel header="活動管理" style={{
            margin:'0px',
            padding:'0px'
          }}>
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
                  <th style={{width:'30%'}}>標題</th>
                  <th style={{width:'800px'}}>單位</th>
                  <th style={{width:'3%'}}></th>
                  <th style={{width:'3%'}}><Button style={{width:'100%'}} onClick={this.hito} bsStyle="warning">設為主打</Button></th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(function (object, i) {
                    return (
                      <tr key={i} >
                        <td style={{width:'5%'}}>{object.active_id}</td>
                        <td style={{width:'50%'}}>{(object.active_name)}</td>
                        <td style={{width:'15%'}}>{(object.depart)}</td>
                        <td style={{width:'5%'}}><Button style={{width:'100%'}} onClick={() => l.detail(object.active_id)}>Detail</Button></td>
                        <td style={{width:'3%'}}>
                          {object.hot == "T" ? 
                            <div>
                              <Button onClick={() => l.cancel_hito(object.active_id)} style={{width:'100%'}} bsStyle="danger">取消</Button>
                              <input id={i}   checked={true}  className="form-control " type="hidden"/> 
                            </div>
                          :
                            <input id={i}   className="form-control input-sm" type="checkbox" />  
                          }
                        </td>
                      </tr>
                    );
                  })}
                {/* {row} */}
              </tbody>
            </Table>

            <div style={{
              display: this.state.showModal
            }}>

              <ListGroup fill>
              <ListGroupItem><Button onClick={this.all}><img src="img/icons8-long-arrow-left-50.png" style={{width:'40px'}}/></Button></ListGroupItem>
                <ListGroupItem  active>{(this.state.detail_data[0].active_name)}</ListGroupItem>

                <ListGroupItem >
                  <label>地點:</label>
                  <div className="input-group">
                  <input id="insert_location" className="form-control" type="text" placeholder={(this.state.detail_data[0].location)}/>
                  <div className="input-group-btn">
                    <button onClick={()=>th.update_detail('location', 'insert_location' , this.state.detail_data[0].active_id)} className="btn btn-default" type="submit">確認更改</button>
                  </div>
                  </div>
                </ListGroupItem >

                <ListGroupItem >
                  <label>開始時間: </label>
                  <div className="input-group">
                  <input id="insert_start"  className="form-control" type="date" placeholder={(this.state.detail_data[0].active_start)}/>
                  <div className="input-group-btn">
                    <button onClick={()=>th.update_detail('active_start', 'insert_start' , this.state.detail_data[0].active_id)} className="btn btn-default" type="submit">確認更改</button>
                  </div>
                  </div>
                </ListGroupItem >

                <ListGroupItem >
                  <label>結束時間: </label>
                  <div className="input-group">
                  <input id="insert_end"  className="form-control" type="date" placeholder={(this.state.detail_data[0].active_ending)}/>
                  <div className="input-group-btn">
                    <button onClick={()=>th.update_detail('active_end', 'insert_end' , this.state.detail_data[0].active_id)} className="btn btn-default" type="submit">確認更改</button>
                  </div>
                  </div>
                </ListGroupItem >

                <ListGroupItem >
                  <label>承辦單位: </label>
                  <div className="input-group">
                  <input id="insert_depart"  className="form-control" type="text" placeholder={(this.state.detail_data[0].depart)}/>
                  <div className="input-group-btn">
                    <button onClick={()=>th.update_detail('depart', 'insert_depart' , this.state.detail_data[0].active_id)} className="btn btn-default" type="submit">確認更改</button>
                  </div>
                  </div>
                </ListGroupItem >

                <ListGroupItem >
                  <label>演出者: </label>
                  <div className="input-group">
                  <input id="insert_performers"  className="form-control" type="text" placeholder={(this.state.detail_data[0].active_performer)}/>
                  <div className="input-group-btn">
                    <button onClick={()=>th.update_detail('active_performer', 'insert_performers' , this.state.detail_data[0].active_id)} className="btn btn-default" type="submit">確認更改</button>
                  </div>
                  </div>
                </ListGroupItem >

                <ListGroupItem >
                  <Grid style={{width:'100%'}}>
                    <Col xs={6} md={6}><div><textarea className="form-control" style={{height:'500px'}} value={this.state.detail_data[0].active_info}/></div></Col>
                    <Col xs={6} md={6}><div><img style={{width:'50%'}} src={(this.state.detail_data[0].active_pic)}/></div></Col>
                  </Grid>
                </ListGroupItem >
                <ListGroupItem ></ListGroupItem >
                
                
                
                
              {/* <div>地點: {(this.state.detail_data[0].location)}</div>
              <div>開始時間: {(this.state.detail_data[0].active_start)}</div>
              <div>結束時間: {(this.state.detail_data[0].active_ending)}</div>
              <div>承辦單位: {(this.state.detail_data[0].depart)}</div>
              <div>演出者: {(this.state.detail_data[0].active_performer)}</div>
              <div>詳細資訊: {(this.state.detail_data[0].active_info)}</div> */}
              
              
              </ListGroup>
              
            </div>
          </Panel>
        </Well>
        {/* <Button onClick={this.insert}>insert</Button> */}

        
      </div>
    );
  }
}
export default Active;
