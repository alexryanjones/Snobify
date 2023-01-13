const axios = require('axios');
const listeningHistory = require('../models/listeningHistory');
const insults = require('../models/insults') 

async function generateInsult(req, res) {

  const user = req.body.user;
  const artist = req.body.artist;
  const popularity = Math.ceil(req.body.popularity / 10) * 10;
  console.log(req.body);
  
  const artistWeeklyListens = await (listeningHistory.find({artist: artist})).length;
  console.log('stuff', user, artist, popularity, artistWeeklyListens);
  const promptBuilder = await insults.find({popularityRange: popularity, artistWeeklyListens: artistWeeklyListens})
  console.log('prompt', promptBuilder);

  const prompt = `If one fictional character was insulting another fictional character called ${req.body.user} for listening to too much ${req.body.artist}, what might the insult be? It would be aggressive, elaborate and no more than 50 words.`;

  const apiKey = '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';
  const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  
  const data = {
    prompt: prompt,
    max_tokens: 150,
  };
  
  axios
    .post(url, data, { headers: headers })
    .then((response) => {
      res.status(200);
      res.send(response.data.choices[0].text)
    });
}


module.exports = { generateInsult }