import {
  Connect,
  Disconnect,
} from './commands/exports.js';

const methods = {
  Connect,
  Disconnect
};

export class MethodLoader {
  constructor(bactrack, method, ...opts) {
    return new methods[method](bactrack, ...opts);
  }
}

export let methodDefined = (method) => {
  return method in methods;
}
