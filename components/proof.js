import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Table, Well, ButtonGroup, Glyphicon, Image, Nav, NavItem,Tab,Modal} from 'react-bootstrap';

class Proof extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        };
    }
   render() {
      return (
         <div>
            <h2>Proof</h2>
            {JSON.stringify(this.props)} 
            {/* <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        One fine body...
      </Modal.Body>

      <Modal.Footer>
        <Button>Close</Button>
        <Button bsStyle="primary">Save changes</Button>
      </Modal.Footer>

    </Modal.Dialog> */}
         </div>
      );
   }
}
export default Proof;