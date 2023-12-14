let consentStatusResdata = JSON.stringify({
    "metadata": {
      "version": "string",
      "originatorOrgId": "string",
      "originatorParticipantId": "string",
      "timestamp": "string",
      "traceId": "string",
      "requestId": "string"
    },
    "productData": {
      "productId": "1",
      "productNetworkId": "1"
    },
    "loanApplicationIds": [
      "string"
    ],
    "consent": {
      "consentFetchType": "ONETIME",
      "vua": "string",
      "description": "string",
      "isAggregationEnabled": true,
      "consentAggregationId": "string",
      "consentHandle": "string",
      "consentStatus": "READY",
      "url": "string",
      "extensibleData": {}
    },
    "response": {
      "status": "SUCCESS",
      "responseDetail": "string"
    }
  });

  module.exports = consentStatusResdata;