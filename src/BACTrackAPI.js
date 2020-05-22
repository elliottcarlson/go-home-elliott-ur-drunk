import regeneratorRuntime from 'regenerator-runtime';
import { methodDefined, MethodLoader } from './loader.js';
import { BACTrackUnknownCommand } from './errors.js';

export default class BACTrackAPI {
  constructor() {
    this.device = null;
    this.gatt = null;
    this.service = null;
    this.events = {};

    this.DEVICE_UUID = '0000fff0-0000-1000-8000-00805f9b34fb';
    this.STATUS_UUID = '';
    this.COMMAND_UUID = '';
    this.RESPONSE_UUID = '';

    return new Proxy(this, {
      get: (target, prop, receiver) => {
        if (prop in target) {
          return target[prop];
        }

        if (!methodDefined(prop)) {
          throw new BACTrackUnknownCommand(`Unknown method "${prop}"`);
        }

        return function() {
          let method = new MethodLoader(target, prop, ...arguments);
          return method.call();
        }
      }
    });
  }

  emit(name, ev) {
    const event = this.events[name];

    if (event) {
      event.forEach(fn => {
        fn.call(null, ev);
      });
    }
  }

  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(fn);
    return () => {
      this.events[name] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }
}
