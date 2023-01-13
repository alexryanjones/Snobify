const axios = require('axios');

function generateInsult(req, res) {

  console.log('arteest', req.body);

  const prompt = `If one fictional character was insulting another fictional character called ${req.body.user} for listening to too much ${req.body.artist}, what might the insult be? It would be aggressive, elaborate and no more than 50 words.`;
  
  // const prompt = 'What is your name?'

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
    // .then((response) => response.json())
    .then((response) => {
      // console.log(response.data);
      res.status(200);
      res.send(response.data.choices[0].text)
    });
}

// generateInsult();

module.exports = { generateInsult }