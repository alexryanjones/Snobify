const axios = require('axios');
const listeningHistory = require('../models/listeningHistory');
const insults = require('../models/insults') 

async function generateInsult(req, res) { 

  const user = req.body.userInfo.name;
  const artist = req.body.trackInfo.artist;
  const popularity = Math.ceil(req.body.trackInfo.popularity / 10) * 10;
  
  const artistWeeklyListens = await listeningHistory.count({artist: artist})
  console.log('stuff', user, artist, popularity, artistWeeklyListens);
  const promptBuilder = insults.find({popularityRange: popularity, artistWeeklyListens: artistWeeklyListens})
  // console.log('prompt', promptBuilder);

  const prompt = `If one fictional character was insulting another fictional character called ${user} for listening to too much ${artist}, what might the insult be? It would be aggressive, elaborate and no more than 50 words.`;

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