import { BACTrackStatus } from './BACTrackStatus.js';
import { BACTrackUnableToConnect, BACTrackUnableToConnectToGatt } from '../errors.js';

export class Connect {
  constructor(bactrack) {
    this.bactrack = bactrack;
  }

  async pair() {
    console.log(this.bactrack.DEVICE_UUID);
    try {
      this.bactrack.device = await navigator.bluetooth.requestDevice({
        filters: [
          { services: [ this.bactrack.DEVICE_UUID ] }
        ],
        /*
        optionalServices: [
          '0000180a-0000-1000-8000-00805f9b34fb',
          '00001800-0000-1000-8000-00805f9b34fb',
          '00001801-0000-1000-8000-00805f9b34fb',
          '0000180f-0000-1000-8000-00805f9b34fb',
          '0000fff0-0000-1000-8000-00805f9b34fb',
          '0000ffa0-0000-1000-8000-00805f9b34fb',
          '0000ffc0-0000-1000-8000-00805f9b34fb',
          '0000ffe0-0000-1000-8000-00805f9b34fb',
        ]
        */
      });

      console.log(this.bactrack.device);

      if (this.bactrack.device !== null) {
        return true;
      }
    } catch(error) {
      console.log(error);
    }

    throw new BACTrackUnableToConnect();
  }

  async call() {
    if (!this.bactrack.device) {
      try {
        await this.pair();
      } catch(error) {
        throw error;
      }
    }

    try {
      this.bactrack.gatt = await this.bactrack.device.gatt.connect();
      this.bactrack.emit('connect');

      this.bactrack.service = await this.bactrack.gatt.getPrimaryService(this.bactrack.DEVICE_UUID);
      this.bactrack.emit('ready');

      console.log(this.bactrack.service);

      if (this.bactrack.service !== null) {
//        this.bactrack.emit('connect');
        this.bactrack.device.addEventListener('gattserverdisconnected', this.disconnectEvent.bind(this));
//        let status_pipe = await this.bactrack.service.getCharacteristic(this.bactrack.STATUS_UUID);
//        status_pipe.addEventListener('characterisiticvaluechanged', this.statusEvent.bind(this));
        return true;
      }

    } catch(error) {
      console.log(error);
    }

    throw new BACTrackUnableToConnectToGatt();
  }

  statusEvent(ev) {
    this.bactrack.emit('statusChange', new BACTrackStatus(ev.target.value));
  }

  disconnectEvent(ev) {
    console.log('received disconnect from gattserverdisconnected');
    this.bactrack.emit('disconnect', {
      name: this.bactrack.device.name
    });
  }
}
