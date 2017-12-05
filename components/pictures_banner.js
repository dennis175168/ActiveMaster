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

class PicturesBanner extends Component {
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

  insert(pic){
      const data = new FormData();
      data.append('col', "endside_picture");
      data.append('sql1', "pic_name, pic_type_id");
      data.append('sql2', "'"+pic+"', '"+1+"'");

      fetch("http://140.135.168.68/ajax/school/insert_all.php", {
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

  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this
      .fileUpload(this.state.file)
      .then((response) => {
        //console.log(response.data);
      });

    var fullPath = document.getElementById('fileToUpload').value;
    if (fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0
        ? fullPath.lastIndexOf('\\')
        : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      
      var pic = "http://140.135.168.68/ajax/school/webindex_pic/"+filename;
      alert(pic);
      this.insert(pic);
    }

    
    
  }
  onChange(e) {
    var fullPath = document.getElementById('fileToUpload').value;
    if (fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0
        ? fullPath.lastIndexOf('\\')
        : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
      }
      alert(filename);
    }
    this.setState({file: e.target.files[0]});
    //alert(JSON.stringify(this.state));
  }

  fileUpload(file) {
    const url = 'http://140.135.168.68/ajax/school/upload_bannerfile.php';
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
        
        <ListGroupItem>
        <label>選擇Banner圖片: </label>
        <form onSubmit={this.onFormSubmit}>
        < ListGroupItem >
        <input
            type="file"
            onChange={this.onChange}
            name="fileToUpload"
            id="fileToUpload"/>
        </ListGroupItem >
          
        < ListGroupItem >
          <Button style={{width:'100%'}} type="submit" bsStyle="success">Upload</Button>
        </ListGroupItem>
          {/* {JSON.stringify(this.state.lll)} */}
        </form>
        </ListGroupItem>

      </div>

    )
  }
}
export default PicturesBanner;
