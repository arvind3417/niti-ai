const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const axios = require("axios");

const consenthandleReqdata = require("./consenthandleReq.js");

app.use(express.json()); // Middleware to parse JSON in the request body

app.get('/', (req, res) => {
  res.send('hello from simple server :)');
});

app.post('/createLoanResponse', (req, res) => {
    console.dir(JSON.parse(JSON.stringify(req.body)))
  console.log('Request Body:', req.body); // Log the request body
  res.json({ status: 'ok', message: 'data received' });
});
// app.post('/consentHandleRes',(req,res)=>{
//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://ocen.dev/v4.0.0alpha/consent/consentHandleRequest',
//     headers: { 
//       'Content-Type': 'application/json', 
//       'Accept': 'application/json'
//     },
//     data : consentReqData
//   };

//   axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });
// })

app.post('/consentHandleReq', async (req, res) => {
  try {
    const consentReqData = req.body;

    const lenderServerUrls = [
      'http://localhost:3001',
      'http://localhost:3000',
    ];

    const responses = await Promise.all(
      lenderServerUrls.map((lenderServerUrl) => makeConsentRequest(lenderServerUrl, consentReqData))
    );

    res.json({ status: 'ok', responses });
  } catch (error) {
    console.error('Error handling consent request:', error.message);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

async function makeConsentRequest(lenderServerUrl, consentReqData) {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `${lenderServerUrl}/consentHandleRes`,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    data: consenthandleReqdata,
  };

  try {
    const response = await axios.request(config);
    console.log(`Response from ${lenderServerUrl}:`, JSON.stringify(response.data));
    return { lender: lenderServerUrl, response: response.data };
  } catch (error) {
    console.error(`Error making request to ${lenderServerUrl}:`, error.message);
    throw error;
  }
}
app.post('/generateOffersResponse',(req,res)=>{
  console.dir(JSON.parse(JSON.stringify(req.body)))
  res.json({ status: 'ok', message: 'generate offers response received' });
})

app.post('/statusResponse',(req,res)=>{
  console.dir(JSON.parse(JSON.stringify(req.body)))
  res.json({ status: 'ok', message: 'data received' });
})

app.post('/setOffersResponse',(req,res)=>{
  console.dir(JSON.parse(JSON.stringify(req.body)))
  res.json({ status: 'ok', message: 'data received' });
})


app.listen(port, () => console.log('>loan Agent: ' + port)); 
