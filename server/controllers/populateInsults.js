const insults = require('./../models/insults');
const prompts = require('./../prompts');

function loadInsults(req, res) {
    try {
      insults.deleteMany({}, function (err) {
      console.log('collection removed');
    });
    prompts.forEach((prompt) => {
      insults.create(prompt);
    });
    res.sendStatus(200);
  } catch (err) {
    res.staus(400);
    res.send(err);
  }
    
}

module.exports = { loadInsults };
