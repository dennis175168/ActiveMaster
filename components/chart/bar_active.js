import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {SqlApi_url} from '../../config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  PieChart, Pie, Sector, Cell,LabelList,Radar, RadarChart, PolarGrid,  PolarAngleAxis, PolarRadiusAxis} from 'recharts';
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
  OverlayTrigger,
  Tabs,
  ListGroup,
  ListGroupItem,
  Panel,
  Grid,
  Row,
  Col,
  Label
} from 'react-bootstrap';

class BarActive extends Component {
  constructor(props) {
    super(props);

    this.state = {
        
        active_count:[{
          active_id:'123',
        }],
        
    };
    this.get_active_count = this.get_active_count.bind(this); //傳遞子物件
    // this.get_data = this.get_data.bind(this);
  }



  componentWillMount(){
    this.get_active_count();
  }

  get_active_count() {
      var aaa = [];

      //分類1~5
      for(var i=1 ; i<=5 ;i++){
        const data = new FormData();
        data.append('sql', 'SELECT COUNT(active_type) as count, type.active_type, type.active_type_id From active, type where active.active_type_id = type.active_type_id AND type.active_type_id = '+i );

        //alert(i);
        var q = i;
        fetch(SqlApi_url, {
        method: 'post',
        body: data
        }).then((res) => {
            return res.json();
        }).then((res) => {

            aaa.push(
                //{favor:res[0].favor,active_type:res[0].active_type}
                res[0]
            )
        });
      }
      this.setState({active_count: aaa});
      
    
  }
   render() {
       var qq= [];
       for(var i=0; i<=4 ;i++ ){
           qq.push(this.state.active_count[i]);
       }
       
       var data = [this.state.active_count[0],this.state.active_count[1],this.state.active_count[2],this.state.active_count[3],this.state.active_count[4]];
    
    
      return (
            <div>
                 {/* {JSON.stringify(this.state.active_count)}  */}
                {/* {JSON.stringify(this.state.active_count1)} */}
                <BarChart width={window.screen.availWidth/4} height={400} data={data} >
                    <XAxis dataKey="active_type"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend />
                    <Bar dataKey="count" stackId="a" fill="#4682B4" position="center" >
                    <LabelList dataKey="count" position="top" />
                    </Bar>
                </BarChart>  
            </div>
      );
   }
}


module.exports = BarActive;
