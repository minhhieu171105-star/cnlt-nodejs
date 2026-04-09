const { Transform } = require("stream");

class TextTransform extends Transform {
  _transform(chunk, encoding, callback) {
    const text = chunk.toString().toUpperCase();

    this.push(text);

    callback();
  }
}

module.exports = TextTransform;
