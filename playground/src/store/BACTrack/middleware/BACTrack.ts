import BACTrackAPI from '../../../../../src/BACTrackAPI';

const EVENTS = {
  CONNECT: 'connect',
  READY: 'ready',
  DISCONNECT: 'disconnect',
};

export default class BACTrack {
  private onConnectHandler: (isConnected: boolean) => void;
  private onReadyHandler: (isReady: boolean) => void;
  private API: any;

  constructor(
    onConnect: (isConnected: boolean) => void,
    onReady: (isReady: boolean) => void,
  ) {
    this.onConnectHandler = onConnect;
    this.onReadyHandler = onReady;
    this.API = undefined;
  }

  public connect = () => {
    this.API = new BACTrackAPI();
    this.API.on(EVENTS.CONNECT, this.onConnected);
    this.API.on(EVENTS.READY, this.onReady);
    this.API.on(EVENTS.DISCONNECT, this.onDisconnect);
    this.API.Connect();
  };

  public onConnected = () => {
    console.log('onConnected!');
    this.onConnectHandler(true);
  };

  public onReady = () => {
    console.log('onReady!');
    this.onReadyHandler(true);
  };

  public onDisconnect = () => {

    this.onConnect(false);
    this.onReady(false);
  };

  public disconnect = () => {
    this.API.Disconnect();
  }
}
