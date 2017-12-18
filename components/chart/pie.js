import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import {SqlApi_url} from '../../config';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  PieChart, Pie, Sector, Cell,Text } from 'recharts';
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

class MyPie extends Component {
  constructor(props) {
    super(props);

    this.state = {
        
        active_count:[
            {"favor":1,"name":"音樂"},
            {"favor":1,"name":"舞蹈/戲劇"},
            {"favor":1,"name":"講座"},
            {"favor":1,"name":"電影"},
            {"favor":1,"name":"其他"}]
        
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
        data.append('sql', "SELECT COUNT(active_type) as favor, type.active_type, type.active_type_id From student, note, active, type  where note.active_id = active.active_id AND active.active_type_id = type.active_type_id AND student.stu_id = note.stu_id AND student.stu_id LIKE '103%' AND type.active_type_id = "+i );

        fetch(SqlApi_url, {
            method: 'post',
            body: data
        }).then((res) => {
            return res.json();
        }).then((res) => {
            aaa.push(
                {favor: parseInt(res[0].favor),name:res[0].active_type}
                //res[0]
            )
            //this.setState({active_count: res});
        });
      }
      this.setState({active_count: aaa});
    
  }
   render() {
    const data01 = [{name: 'Group A', value: 10},
                    {name: 'Group B', value: 300},
                    {name: 'Group C', value: 300}, 
                    {name: 'Group D', value: 200},
                    {name: 'Group E', value: 278}, 
                    {name: 'Group F', value: 189}]

   

    const data02 = [{"favor":0,"name":"音樂"},
                    {"favor":0,"name":"舞蹈/戲劇"},
                    {"favor":1,"name":"講座"},
                    {"favor":1,"name":"電影"},
                    {"favor":2,"name":"其他"}]
     const data03 = [this.state.active_count[0],
                    this.state.active_count[1],
                    this.state.active_count[2],
                    this.state.active_count[3],
                    this.state.active_count[4]]
       var qq= [];
       qq["property"] = "456";
       for(var i=0; i<=4 ;i++ ){
           qq.push(this.state.active_count[i]);
       }
       var data = [this.state.active_count[0],this.state.active_count[1],this.state.active_count[2],this.state.active_count[3],this.state.active_count[4]];
       const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#003C9D'];
    
      return (
            <div>
                {/* {JSON.stringify(data)} <br/>*/}
                {/* {JSON.stringify(data03)}  */}
                
                <PieChart width={window.screen.availWidth/10} height={300} style={{marginLeft:'14%',marginRright:'14%'}}>
                    <Pie dataKey="favor" isAnimationActive={false} data={data03} outerRadius={80} innerRadius={40} fill="#8884d8" label>
                    {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>
                    {/* <Pie dataKey="favor" data={data} cx={300} cy={100} innerRadius={40} outerRadius={80} fill="#82ca9d" label/> */}
                    <Legend />
                    <Tooltip/>
                    <Text>123</Text>
                </PieChart>
            </div>
      );
   }
}


module.exports = MyPie;
//export default Chart;
