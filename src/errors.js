class BACTrackExtendableError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.stack = (new Error()).stack;
    this.name = this.constructor.name;
  }
}

export class BACTrackUnknownCommand extends BACTrackExtendableError {}
export class BACTrackUnableToConnect extends BACTrackExtendableError {}
export class BACTrackNotConnected extends BACTrackExtendableError {}
export class BACTrackUnableToConnectToGatt extends BACTrackExtendableError {}

export const BACTrackCommandError = {
}
