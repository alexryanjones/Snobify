const axios = require('axios');
const listeningHistory = require('../models/listeningHistory');
const insults = require('../models/insults') 

async function generateInsult(req, res) { 
  try {
    const user = req.body.userInfo.name;
    const artist = req.body.trackInfo.artist;
    const popularity = Math.ceil(req.body.trackInfo.popularity / 10) * 10;

    let weeklyListens = await listeningHistory.count({ artist: artist });
    weeklyListens = Math.ceil(weeklyListens / 10) * 10;
    if (weeklyListens > 40) weeklyListens = 40;
    const promptBuilder = await insults.find({
      popularityRange: popularity,
      artistWeeklyListens: weeklyListens,
    });

    console.log(promptBuilder[0]);

    const prompt = `If one fictional character was ${promptBuilder[0].keyword} another fictional character called ${user} for listening to ${promptBuilder[0].listeningAmount} ${artist},  what might they way? It would be ${promptBuilder[0].strength}, elaborate, talk about their ${promptBuilder[0].target} and no more than 80 words.`;

    const apiKey = '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';
    const url =
      'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      prompt: prompt,
      max_tokens: 150,
    };

    axios.post(url, data, { headers: headers }).then((response) => {
      res.status(200);
      res.send(response.data.choices[0].text);
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.send('You filthy')
  }
}


module.exports = { generateInsult }