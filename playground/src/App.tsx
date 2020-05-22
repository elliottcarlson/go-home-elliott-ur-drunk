import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as actions from './store/BACTrack/actions';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';

interface IBACTrackDispatchProps {
  connect: () => void;
}

interface IBACTrackState {
  BACTrackState: {
    connected: false
  }
}

interface IBACTrackProps {
  connected: false;
  ready: false;
  connect: () => void;
}

class App extends React.Component {
  state = {
    log: ''
  }

  constructor(props: any) {
    super(props);

    this.console = React.createRef();
  }

  log = (msg: string) => {
    let { log } = this.state;
    log += msg + "\n";
    this.setState({ log });
    this.console.current.scrollTop = this.console.current.scrollHeight;
  }

  render() {
    const {
      connected,
      ready
    } = this.props as IBACTrackProps;

    const { log } = this.state;

    console.log(this.props);

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
                <Table.Cell className='indicator' data-value={connected} />
                <Table.Cell><strong>Connected:</strong></Table.Cell>
                <Table.Cell className='indicator' data-value={ready} />
                <Table.Cell><strong>Connected:</strong></Table.Cell>
                <Table.Cell className='indicator' />
              </Table.Row>
            </Table.Body>
          </Table>

          <Container>
            <Button primary onClick={this.props.connect}>Connect</Button>
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

const mapStateToProps = (state: IBACTrackState) => ({
  connected: state.BACTrackState.connected,
  ready: state.BACTrackState.ready,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): IBACTrackDispatchProps => ({
  connect: () => dispatch(actions.connect())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
