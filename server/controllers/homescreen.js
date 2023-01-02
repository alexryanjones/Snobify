function sayHello(req, res) {
  console.log('You hit the homescreen endpoint.');
  try {
    res.status(200);
    res.send('oh hi');
  }
  catch (err) {
    res.status(400);
    res.send(err);
  }
}

export default { sayHello }