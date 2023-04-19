const Box = require('box-node-sdk');

export default async function webhook(request, response) {

    let isValid = Box.validateWebhookMessage(request.body, request.headers, process.env.primaryKey, process.env.secondaryKey);

    if (isValid) {
      const sdkConfig = {
          boxAppSettings: {
              clientID: process.env.clientID,
              clientSecret: process.env.clientSecret
          }, 
          enterpriseID: process.env.enterpriseID 
      }
      const sdk = Box.getPreconfiguredInstance(sdkConfig)

      const client = sdk.getAnonymousClient(); 
      
      await client.fileRequests.copy(process.env.fileRequestId, {
        folder: {
          id: request.body.source.id,
          type: request.body.source.type
        },
        title: "Case Document Request"
      })
      
      response.status(200).json({
        info: 'success'
      });
    } else {
      response.status(200).json({
        info: 'Error'
      });
    }
  }