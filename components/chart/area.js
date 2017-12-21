import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {SqlApi_url} from '../../config';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Brush} from 'recharts';
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

class MyArea extends Component {
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

      const data = new FormData();
      data.append('sql', 'Select count(active_start) as counted_leads, active_start as count_date from active group by active_start' );

      //alert(i);
      //var q = i;
      fetch(SqlApi_url, {
      method: 'post',
      body: data
      }).then((res) => {
          return res.json();
      }).then((res) => {
          for(var i=0; i<=res.length-1;i++){
              aaa.push(
                {"counted_leads":parseInt(res[i].counted_leads),"count_date":res[i].count_date}
              )
          }

          this.setState({active_count: aaa});
      });
     
      
    
  }
   render() {
       
       
       const data = this.state.active_count;
    //     [{"counted_leads":1,"count_date":"2017-11-28"},
    //    {"counted_leads":8,"count_date":"2017-12-01"},
    //    {"counted_leads":9,"count_date":"2017-12-04"}];
    
    
      return (
            <div>
                  {/* {JSON.stringify(this.state.active_count)}   */}
                {/* {JSON.stringify(this.state.active_count1)} */}
                <AreaChart width={window.screen.availWidth/2} height={400} data={data}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <XAxis dataKey="count_date" type="category" orientation="bottom" padding={{ left: 20, right: 20 }} />
                    <YAxis/>
                    <Tooltip/>
                    <Brush />
                    <Area type='monotone' dataKey='counted_leads' stroke='#042a3a' fill='#176382'  />
                </AreaChart>
            </div>
      );
   }
}


module.exports = MyArea;
