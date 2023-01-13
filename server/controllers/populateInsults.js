const insults = require('./../models/insults');
const prompts = require('./../prompts');

function loadInsults() {
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
}

module.exports = { loadInsults };
