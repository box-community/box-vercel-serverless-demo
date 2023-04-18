const Box = require('box-node-sdk');

export default async function webhook(request, response) {

    let isValid = Box.validateWebhookMessage(request.body, request.headers, process.env.primaryKey, process.env.secondaryKey);

    if (isValid) {
      const sdkConfig = {
          boxAppSettings: {
              clientID: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET
          }, 
          enterpriseID: "273262935" 
      }
      const sdk = Box.getPreconfiguredInstance(sdkConfig)

      const client = sdk.getAnonymousClient(); 
      
      await client.files.copy('1190810873364',request.body.source.id)
      
      response.status(200).json({
        info: 'success'
      });
    } else {
      response.status(200).json({
        info: 'Error'
      });
    }
  }