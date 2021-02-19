// This means that this httperror is based on the built-error , hence thats why it is refrenced or extends it
class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Adds a message property
    this.code = errorCode; // Adds a code property
  }
}
module.exports = HttpError;
