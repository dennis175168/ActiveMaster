import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {SqlApi_url} from '../config';
import PicturesBanner from './pictures_banner';
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
    Carousel,
    Thumbnail 
  } from 'react-bootstrap';


class PictureControll extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            endside_picture:[{
                pic_id:'123',
                pic_name:'456',
                pic_type_id:'456'
            }],
            endside_gift_picture:[{
                pic_id:'123',
                pic_name:'456',
                pic_type_id:'456'
            }],
        };
        this.get_endside_picture = this.get_endside_picture.bind(this); //傳遞子物件
    }
    componentWillMount(){
        //alert('123');
        this.get_endside_picture();
        this.get_endside_gift_picture();
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
    get_endside_gift_picture(){
        const data = new FormData();
        data.append('sql','select * from endside_picture where pic_type_id = 2');

        fetch(SqlApi_url, {
            method:'post',
            body:data,
        })
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            this.setState({endside_gift_picture: res});
        });
    }

    banner(i){
        alert(i);
        var r = confirm("確定刪除");
        if (r == true) {
            this.delete(i);
        } else {
            alert('Cancel the delete');
        }
    }

    gift(i){
        alert(i);
        var r = confirm("確定刪除");
        if (r == true) {
            this.delete(i);
        } else {
            alert('Cancel the delete');
        }
    }

    delete(i){
        alert('delete');
        var _id = i;
        var qq =  "DELETE FROM endside_picture WHERE pic_id="+_id;
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
            this.get_endside_picture();
            this.get_endside_gift_picture();
        }).catch((e)=>{
          console.log(e);
        });
    }

   render() {
       var th =this;
      return (
         <div>
            <Well>
                <Panel header={"Banner圖片"}>
                    <Grid>
                        <Row className="show-grid">
                        {this.state.endside_picture.map(function(object , i){
                            return (
                                <Col xs={6} md={4}>
                                    <Thumbnail src={object.pic_name} alt="242x200">
                                        <p>
                                            <Button onClick={()=>th.banner(object.pic_id)} style={{width:'100%'}} bsStyle="danger">刪除</Button>
                                        </p>
                                    </Thumbnail>
                                </Col>
                            );
                        })}
                        
                        </Row>
                    </Grid>
                </Panel>
            </Well>

            <Well>
                <Panel header={"禮物圖片"}>
                    <Grid>
                        <Row className="show-grid">
                        {this.state.endside_gift_picture.map(function(object , i){
                            return (
                                <Col xs={6} md={4}>
                                    <Thumbnail src={object.pic_name} alt="242x200">
                                        <p>
                                            <Button onClick={()=>th.gift(object.pic_id)} style={{width:'100%'}} bsStyle="danger">刪除</Button>
                                        </p>
                                    </Thumbnail>
                                </Col>
                            );
                        })}
                        
                        </Row>
                    </Grid>
                </Panel>
            </Well>
         </div>
      );
   }
}
export default PictureControll;