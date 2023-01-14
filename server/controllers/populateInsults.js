const insults = require('./../models/insults');
const prompts = require('./../prompts');

function loadInsults() {
    insults.deleteMany({}, function (err) {
      console.log('collection removed');
    });
    prompts.forEach((prompt) => {
      insults.create(prompt);
    });
}

module.exports = { loadInsults };
