const { Duplex } = require("stream");

class EchoDuplex extends Duplex {
  _read(size) {}

  _write(chunk, encoding, callback) {
    this.push(chunk);

    callback();
  }
}

module.exports = EchoDuplex;
