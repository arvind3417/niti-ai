const express = require("express");
const app = express();
const axios = require("axios");

const createloanResponsedata = require("./createloanResponse.js");
const setOffersResponsedata = require('./setOffersResponse')
const generateOffersResponsedata  = require('./generateOffersResponse.js');
const consentStatusResdata = require('./consentStatusRes')
const port = 3000;

app.use(express.json()); // Middleware to parse JSON in the request body

app.listen(port, () => {
  console.log(` lender2 ${port}`);
});

app.post("/createLoanRequest", (req, res) => {
  setTimeout(() => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3002/createLoanResponse",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: createloanResponsedata, // Assuming data is already a JSON object
    };

    axios
      .request(config)
      .then((response) => {
        // console.log('Response Data:', response.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, 1000);

  res.send({
    error: 0,
    traceId: 1234,
    timestamp: new Date(),
  });
});

app.post("/consentHandleRes", (req, res) => {
  res.send({ msg: "sent the consent handle response of lender2" });
});

app.post("/generateOffersRequest", (req, res) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3002/generateOffersResponse",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: generateOffersResponsedata,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
});


app.post("/statusRequest", (req, res) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3002/statusResponse",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: consentStatusResdata,
    };
  
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
  
  app.post("/setOffersRequest", (req, res) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3002/setOffersResponse",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: setOffersResponsedata,
    };
  
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  });
  