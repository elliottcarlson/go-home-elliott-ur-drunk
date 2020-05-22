export const CONNECTION_CHANGED = 'CONNECTION_CHANGED';
export const CONNECTION_READY = 'CONNECTION_READY';
export const CONNECT = 'CONNECT';

export const connectionChanged = (isConnected: boolean) => {
  return {
    type: CONNECTION_CHANGED,
    connected: isConnected,
    isError: false,
  };
};

export const readyStateChanged = (isReady: boolean) => {
  return {
    type: CONNECTION_READY,
    ready: isReady,
    isError: false,
  };
};

export const connect = () => {
  return {
    type: CONNECT
  };
};
