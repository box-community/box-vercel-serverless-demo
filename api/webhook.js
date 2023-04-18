const Box = require('box-node-sdk');

export default async function boxskill(request, response) {

    const sdkConfig = {
        boxAppSettings: {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        }, 
        enterpriseID: "273262935" 
    }
    const sdk = Box.getPreconfiguredInstance(sdkConfig);

    const client = sdk.getCCGClientForUser("25097633932");

    let fileInfo = await client.files.get("1190810873364");

    response.status(200).json({
      info: JSON.stringify(fileInfo)
    });
  }