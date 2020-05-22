import { CONNECTION_CHANGED, CONNECTION_READY } from '../actions';

const INITIAL_STATE = {
  connected: false,
  ready: false,
};

function BACTrackReducer(state = INITIAL_STATE, action: { type: string, connected: boolean }) {
  let reduced;

  switch (action.type) {
    case CONNECTION_CHANGED:
      reduced = Object.assign({}, state, {
        connected: action.connected,
        isError: false,
      });
      break;
    case CONNECTION_READY:
      reduced = Object.assign({}, state, {
        ready: action.ready,
      });
      break;
    default:
      reduced = state;
  }

  return reduced;
}

export default BACTrackReducer;
