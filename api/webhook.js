const Box = require('box-node-sdk');

export default async function webhook(request, response) {

    //This line will validate that box is the service calling the webhook. 
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
      
      await client.fileRequests.copy(process.env.filerequestID, {
        folder: {
          id: request.body.source.id,
          type: request.body.source.type
        },
        //You can edit this field (or remove it)
        title: "Case Document Request"
      })
    //If the service fails for some reason, still return a 200. This keeps Box from calling again and again.    
      response.status(200).json({
        info: 'success'
      });
    } else {
      response.status(200).json({
        info: 'Error'
      });
    }
  }