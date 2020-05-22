export class Disconnect {
  constructor(bactrack) {
    this.bactrack = bactrack;
  }

  async call() {
      console.log('disconnecting!');
      console.log(this.bactrack);
    if (this.bactrack.device) {
      console.log('disconnecting!');
      this.bactrack.gatt.disconnect();
    }
  }
}
