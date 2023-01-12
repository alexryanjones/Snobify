function sayHello(req, res) {

  try {
    res.status(200);

  }
  catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { sayHello };