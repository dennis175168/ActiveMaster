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
  Panel
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

    this.insert = this
      .insert
      .bind(this); //傳遞子物件
    this.get_data = this
      .get_data
      .bind(this);
    this.detail = this
      .detail
      .bind(this);
    this.all = this
      .all
      .bind(this);
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

  render() {
    const l = this;

    const info = this.state.data;
    const row = [];
    for (var i = 0; i <= this.state.data.length - 1; i++) {

      row.push(

        <tr onClick={() => l.detail(info[i].active_id)}>
          {/* <td>{info[i].active_id}</td> */}
          <td>{info[i].active_name}</td>
          <td>{info[i].location}</td>
          <td>{info[i].depart}</td>
          {/* <td><img style={{width:'100px'}} src={info[i].active_pic}/></td> */}
        </tr>
      )
    }
    var newState = {};
    for (var i = 0; i <= this.state.data.length - 1; i++) {
      newState[i] = true;
    }
    //this.setState(newState);

    return (

      <div>
        <Well >
          <ButtonGroup  style={{width:'100%'}}>
              <Button bsStyle="success" onClick={()=>this.get_data()}>All</Button>
              <Button bsStyle="success" onClick={()=>this.select_data_type(1)}>音樂</Button>
              <Button bsStyle="success" onClick={()=>this.select_data_type(2)}>電影</Button>
              <Button bsStyle="success" onClick={()=>this.select_data_type(3)}>舞蹈/戲劇</Button>
              <Button bsStyle="success" onClick={()=>this.select_data_type(4)}>講座</Button>
              <Button bsStyle="success" onClick={()=>this.select_data_type(5)}>其他</Button>    
          </ButtonGroup>

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
              width:'100%',
              margin:'0px',
              padding:'0px'
            }}
              striped
              bordered
              hover>
              <thead>
                <tr>
                  <th style={{width:'5%'}}>#</th>
                  <th style={{width:'50%'}}>標題</th>
                  <th style={{width:'15%'}}>地點</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map(function (object, i) {
                    return <tr key={i} onClick={() => l.detail(object.active_id)}>
                      {/* {JSON.stringify(object)} */}
                      <td>{i}</td>
                      <td>{(object.active_name)}</td>
                      <td>{(object.location)}</td>
                      {/* <td><img style={{width:'100px'}} src={(object.active_pic)}/></td> */}

                    </tr>;
                  })}
                {/* {row} */}
              </tbody>
            </Table>

            <div style={{
              display: this.state.showModal
            }}>

              <ListGroup>
                <ListGroupItem  active>{(this.state.detail_data[0].active_name)}</ListGroupItem>
                <ListGroupItem onClick={this.all}>BACK</ListGroupItem >
                <ListGroupItem >
              <div>地點: {(this.state.detail_data[0].location)}</div>
              <div>開始時間: {(this.state.detail_data[0].active_start)}</div>
              <div>結束時間: {(this.state.detail_data[0].active_ending)}</div>
              <div>承辦單位: {(this.state.detail_data[0].depart)}</div>
              <div>演出者: {(this.state.detail_data[0].active_performer)}</div>
              <div>詳細資訊: {(this.state.detail_data[0].active_info)}</div>
              <div><img style={{width:'50%'}} src={(this.state.detail_data[0].active_pic)}/></div>
              </ListGroupItem>
              
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
