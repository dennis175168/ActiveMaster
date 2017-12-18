import React, { Component } from 'react';
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
  Grid
} from 'react-bootstrap';
import {SqlApi_url} from '../config';

class Proof extends Component {
  constructor(props) {
    super(props);

    this.state = {
      proof: [
        {}
      ]
    };

    // this.insert = this.insert.bind(this); //傳遞子物件
    // this.get_data = this.get_data.bind(this);
    // this.detail = this.detail.bind(this);
    // this.all = this.all.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.hito = this.hito.bind(this);
    // this.cancel_hito = this.cancel_hito.bind(this);
    // this.update = this.update.bind(this);
  }

  componentWillMount() {
    //alert('123');
    this.get_proof();
  }

  get_proof() {
    const data = new FormData();
    data.append('sql', 'select * from proof , active , student where student.stu_id = proof.student_id AND active.active_id = proof.active_id ');

    fetch(SqlApi_url, {
      method: 'post',
      body: data
    }).then((res) => {
      return res.json();
    }).then((res) => {
      this.setState({proof: res});
    });
  }


   render() {
      return (
         <div>
            <h2>活動紀錄</h2>
            {/* {JSON.stringify(this.props)}  */}
            <Well >
            <Panel header="通識認證" style={{
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
                    <th style={{width:'30%'}}>學號</th>
                    <th style={{width:'800px'}}>通識活動</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.proof.map(function (object, i) {
                      return (
                        <tr key={i} >
                          <td style={{width:'5%'}}>{object.proof_id}</td>
                          <td style={{width:'15%'}}>{(object.stu_id)}</td>
                          <td style={{width:'50%'}}>{(object.active_name)}</td>
                          
                        </tr>
                      );
                    })}
                </tbody>
              </Table>

              <Button bsStyle="success">csv</Button>

            </Panel>
            </Well>
         </div>
      );
   }
}
export default Proof;