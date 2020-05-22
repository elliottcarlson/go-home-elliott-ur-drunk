import BACTrack from './BACTrack';
import { CONNECT, connectionChanged, readyStateChanged } from '../actions';

const BACTrackMiddleware = (store: any) => {
  const onConnectionChange = (isConnected: boolean) => {
    store.dispatch(connectionChanged(isConnected));
  };

  const onReadyChange = (isReady: boolean) => {
    store.dispatch(readyStateChanged(isReady));
  };

  const bactrack = new BACTrack(
    onConnectionChange,
    onReadyChange,
  );

  return (next: any) => (action: any) => {
    switch (action.type) {
      case CONNECT:
        bactrack.connect();
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default BACTrackMiddleware;
