import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ImagesUploader from 'react-images-uploader';
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
    Carousel
  } from 'react-bootstrap';

class WebControll extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            endside_picture:[{
                pic_id:'123',
                pic_name:'456',
                pic_type_id:'456'
            }],
        };
        this.get_endside_picture = this.get_endside_picture.bind(this); //傳遞子物件
        this.endside_pic = this.endside_pic.bind(this);
    }
    componentWillMount(){
        //alert('123');
        this.get_endside_picture();
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

    delete_endside_pic(i){
        const sql = " DELETE FROM endside_picture WHERE pic_id= "+i;
        this.endside_pic(sql);
        this.get_endside_picture();
    }

    endside_pic(sql){
        const data = new FormData();
        data.append('sql',sql);

        fetch(SqlApi_url, {
            method:'post',
            body:data,
        })
        .then((res) => {
            return res.json();
            this.get_endside_picture();
        })
        .then((res) => {
            
            this.get_endside_picture();
        });
        this.get_endside_picture();

    }

   render() {

    var th = this;

      return (
         <div>

            <Well>
            <Carousel>
                {this.state.endside_picture.map(function(object, i){
                            return(
                                <Carousel.Item>
                                <img  style={{width:'100%'}} src={object.pic_name} />
                                <Carousel.Caption>
                                </Carousel.Caption>
                                </Carousel.Item>
                            );
                        })}

            </Carousel>
            </Well>
            <Well>
                <Panel header="首頁圖片設定" bsStyle="primary">
                
                <Grid style={{width:'100%'}}>
                    {/* <Row className="show-grid">
                        <Col xs={12} md={12}>
                        <Panel fill collapsible defaultExpanded ={false} header="新增">
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
                                    <div><iframe  src="http://127.0.0.1/ajax/school/qq.php"/></div>
                                </ListGroupItem>
                                </ListGroup>
                            </ListGroup>
                        </Panel>
                        </Col>
                    </Row> */}

                    <Row className="show-grid">
                    {this.state.endside_picture.map(function(object, i){
                        return(
                            <Col xs={6} md={4}>
                                <Panel collapsible defaultExpanded header={"圖片"+i}>
                                <ListGroup fill>
                                    <img style={{width:'100%'}} src={object.pic_name}/>
                                    <ListGroupItem><Button onClick={()=> th.delete_endside_pic(object.pic_id)} bsStyle="danger" style={{width:'100%'}}>delete</Button></ListGroupItem>
                                </ListGroup>
                                </Panel>
                            </Col>
                        );
                    })}

                        <Col xs={6} md={4}>
                                <Panel collapsible defaultExpanded header={<span className="glyphicon glyphicon-plus"></span>}>
                                <ListGroup fill>
                                    <PicturesBanner/>
                                </ListGroup>
                                </Panel>
                            </Col>
                    </Row>
                </Grid>

                </Panel>
            </Well>
            
         </div>
      );
   }
}
export default WebControll;