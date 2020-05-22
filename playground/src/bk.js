import regeneratorRuntime from 'regenerator-runtime';
import React, { useState, useEffect } from 'react';
import { useImmer } from 'use-immer';
import ReactDOM from 'react-dom';

import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './css/playground.css';

import { BACTrack } from '../../src/BACTrack.js';

class BACTrackPlayground extends React.Component {
  state = {
    log: ''
  }

  constructor(props) {
    super(props);

    this.console = React.createRef();
  }

  componentDidMount() {
    this.api = new BACTrack();
  }

  log = (msg) => {
    let { log } = this.state;
    log += msg + "\n";
    this.setState({ log });
    this.console.current.scrollTop = this.console.current.scrollHeight;
  }

  handleConnect = () => {
    this.log('Connecting');
    this.api.Connect();
  };

  render() {
    const { log } = this.state;

    return (
      <React.Fragment>
        <br /><br />
        <Segment as={Container} raised>
          <Header dividing>
            BACTrackJS Test Playground
          </Header>

          <Table celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell><strong>Connected:</strong></Table.Cell>
                <Table.Cell className='indicator' data-value={false} />
                <Table.Cell><strong>Connected:</strong></Table.Cell>
                <Table.Cell className='indicator' />
                <Table.Cell><strong>Connected:</strong></Table.Cell>
                <Table.Cell className='indicator' />
              </Table.Row>
            </Table.Body>
          </Table>

          <Container>
            <Button primary onClick={this.handleConnect}>Connect</Button>
          </Container>
        </Segment>

        <Segment as={Container} raised>
          <Header dividing>
            Console
          </Header>

          <textarea ref={this.console} style={{ width: '100%', height: '500px' }} defaultValue={log} />
        </Segment>
      </React.Fragment>
    )
  }
}

let App = document.getElementById('app');
ReactDOM.render(<BACTrackPlayground />, App);
