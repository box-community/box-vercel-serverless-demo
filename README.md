<p align="center">
  <img src="images/box-dev-logo.png" alt= “box-dev-logo” width="30%" height="50%">
</p>

# Box Vercel Serverless Demo
Vercel makes it easy to deploy serverless code that connects to the Box APIs. Follow the instructions below to get started! For this demo, the code creates a new file request based on a template for any new folder created in a configured folder. This type of enhancement is specifically useful when you don't want to recreate complicated file requests for every new folder created. 

For example, let's say you are a case manager and have a folder called Cases. With each file request you send to client, you also need metadata like case numbers or descriptions, alongside the content uploaded. Instead of recreating the template each time, code within a webhook can do this for you!

## Box configuration steps
There are several items that need to be configured in Box for this tutorial to work correctly. It is recommended that you set this tutorial up in a Sandbox environment, as you will need admin privileges. Find more about sandboxes [here](https://support.box.com/hc/en-us/articles/360043697274-Managing-developer-sandboxes-for-Box-admins).

1. [Setup a metadata template](https://support.box.com/hc/en-us/articles/360044194033-Customizing-Metadata-Templates) with a few fields that you would want to request from a client. For example, case number, description, name, etc.
2. [Create a file request template](https://developer.box.com/guides/file-requests/template/). Make sure when you create the template you click the + Add a field button and select Metadata. This will let you select the metadata template you created in step 1, as well as the fields you want to appear for a client to fill out. You can also customize the theme, title, and description. Make a note of the file request id.
3. In the root of your Box account, create a folder called Cases. The name isn't important, but you will want to remember what you call it.
4. Create a new application in the [Box Developer Console](https://app.box.com/developers/console). Click Create new app > Custom App > Server Authentication(Client Credentials Grant) > Type in a name > Click Create App.
5. Under the configuration tab, select App + Enterprise, followed by checking the boxes for Read/Write all files and Manage Webhooks. Then, click Save Changes in the top right.
6. Copy the client id of the application. Back in the Box Admin Console, follow the steps to [approve a custom application](https://developer.box.com/guides/authorization/custom-app-approval/).
7. Back on the General Settings tab of the application you created in the Box Developer Console, you should now see an email that starts like AutomationUser_... in the Service Account Info section. Copy that email. Back in the main Box Web App, collaborate the service account into both the Cases and File Request Template folders you created earlier. This will allow the application to access these folders.
8. Back in the Developer Console on the Webhooks tab of the application you created earlier, Click Manage Security Keys in the top right. Then, generate a key for the both the primary and secondary keys. Make note of these for a future step. 


## Deploy with Vercel
After completing the above, go over to [Vercel](https://vercel.com/) and signup for an account. Then, click the button below to start the deploy process. Vercel will ask you to input the information from the above steps as environment variables.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Smartoneinok/box-vercel-serverless-demo&env=clientID,clientSecret,enterpriseID,primaryKey,secondaryKey,filerequestID)

## Add webhook URL to Box Application
Once the deploy is complete, create a new V2 webhook on the Box application you made. Input the webhook invocation url from Vercel. This url should be your public domain + /api/webhook. For example, `https://[yourprojectname]-pi.vercel.app/api/webhook`.

In the content type section, select the folder you wish to trigger the webhook for. Under folder triggers, check folder created. Then click create webhook in the top right. 

## Test it out
Create a new folder inside the folder you configured the webhook to fire for. After a couple seconds, you should be able to click the ellipsis button > file request > preview and see that the file request template you created earlier is now copied onto this folder.

## Tutorial Authentication
This tutorial shows using client credentials authentication. You are not restricted to using this authentication type. Find out about other kinds in the [developer documentation](https://developer.box.com/guides/authentication/).

### Questions
If you get stuck or have questions, make sure to ask on our [Box Developer Forum](https://support.box.com/hc/en-us/community/topics/360001932973-Platform-and-Developer-Forum)