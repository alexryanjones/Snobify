const insults = require('./../models/insults');
const prompts = require('./../prompts');

function loadInsults() {
  try {
    insults.remove({}, function (err) {
      console.log('collection removed');
    });
    prompts.forEach((prompt) => {
      insults.create(prompt, (err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Prompts populated', doc);
        }
      });
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
}

module.exports = { loadInsults };
