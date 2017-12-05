import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
import {SqlApi_url} from '../config';
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
var FileInput = require('react-file-input');

class Pictures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this
      .onFormSubmit
      .bind(this)
    this.onChange = this
      .onChange
      .bind(this)
    this.fileUpload = this
      .fileUpload
      .bind(this)
  }



  insert(gift_name, gift_coin, pic){
      // const data = new FormData();
      // data.append('sql', "INSERT INTO gift2 (gift_name, gift_coin, gift_pic) VALUES ('"+gift_name+"', '"+gift_coin+"', '"+pic+"')");
      // fetch("http://140.135.168.68/ajax/school/school.php", {
      //     method:'post',
      //     body:data,
      // })
      // .then((res) => {
      //     //return res.json();
      // })
      // .catch((e)=>{
      //   console.log(e);
      // })
      // .then((res) => {
      //     //this.setState({data: res});
      // })
      // .catch((e)=>{
      //   console.log(e);
      // });
      const data = new FormData();
      data.append('sql1', "gift_name, gift_coin, gift_pic");
      data.append('sql2', "'"+gift_name+"', '"+gift_coin+"', '"+pic+"'");

      fetch("http://140.135.168.68/ajax/school/insert.php", {
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
  }

  insert_endside_picture(pic){
    const data = new FormData();
    data.append('col', "endside_picture");
    data.append('sql1', "pic_name, pic_type_id");
    data.append('sql2', "'"+pic+"', '"+2+"'");

    fetch("http://140.135.168.68/ajax/school/insert_all.php", {
        method:'post',
        body:data,
    })
    .then((res) => {
        //return res.json();
        window.location.href = "/#/point";
    })
    .catch((e)=>{
      console.log(e);
    })
    .then((res) => {
        //this.setState({data: res});
        window.location.href = "http://127.0.0.1:3001/#/point";
    })
    .catch((e)=>{
      console.log(e);
    });
}

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit

    
    this
      .fileUpload(this.state.file)
      .then((response) => {
        //console.log(response.data);
      });

    var fullPath = document.getElementById('fileToUpload').value;
    var gift_name = document.getElementById('insert_gift_name').value;
    var gift_coin = document.getElementById('insert_gift_coin').value;
    if (fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0
        ? fullPath.lastIndexOf('\\')
        : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      
      var pic = "http://140.135.168.68/ajax/school/uploads/"+filename;
      alert(pic+ gift_name + gift_coin);

      // const data = new FormData();
      // data.append('sql1', "gift_name, gift_coin, gift_pic");
      // data.append('sql2', "'11136', '2', '3'");

      // fetch("http://140.135.168.68/ajax/school/insert.php", {
      //     method:'post',
      //     body:data,
      // })
      // .then((res) => {
      //     //return res.json();
      // })
      // .catch((e)=>{
      //   console.log(e);
      // })
      // .then((res) => {
      //     //this.setState({data: res});
      // })
      // .catch((e)=>{
      //   console.log(e);
      // });
      this.insert(gift_name, gift_coin, pic);
      this.insert_endside_picture(pic);
    }

    
    
  }
  onChange(e) {
    var fullPath = document.getElementById('fileToUpload').value;
    var gift_name = document.getElementById('insert_gift_name').value;
    var gift_coin = document.getElementById('insert_gift_coin').value;
    if (fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0
        ? fullPath.lastIndexOf('\\')
        : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      alert(filename+ gift_name + gift_coin);
    }
    this.setState({file: e.target.files[0]});
    //alert(JSON.stringify(this.state));
  }
  fileUpload(file) {
    const url = 'http://140.135.168.68/ajax/school/test1.php';
    const formData = new FormData();
    alert(JSON.stringify(file));
    formData.append('fileToUpload', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return (fetch(url, {
      method: 'post',
      body: formData
    }).then((res) => {
      console.log(res.json());
      return res.json();
    }).catch((e) => {
      console.log(e);
    }).then((res) => {})); //post(url, formData,config)
  }

  render() {
    return (

      <div>
        
        < ListGroupItem >
          <label style={{
            width: '10%'
          }}>輸入禮物名稱:
          </label>
          < input type="text" className="form-control" id="insert_gift_name"/>
        </ListGroupItem>
        < ListGroupItem >
          <label style={{
            width: '10%'
          }}>輸入禮物點數:
          </label>
          < input type="text" className="form-control" id="insert_gift_coin"/>
        </ListGroupItem>
        <ListGroupItem>
        <label>選擇禮物圖片: </label>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="file"
            onChange={this.onChange}
            name="fileToUpload"
            id="fileToUpload"/>
          <div className="form-group">
          <Button type="submit" bsStyle="success">Upload</Button></div>
          {JSON.stringify(this.state.lll)}
        </form>
        </ListGroupItem>

      </div>

    )
  }
}
export default Pictures;
