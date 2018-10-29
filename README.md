# Serverless Timer - client
Simple timer app that works without server, using AWS Ramda to handle user's requests

## Example site
[Serverless-timer](http://serverless-timer-client.s3-website.ap-northeast-2.amazonaws.com/)
You can use this web app after signup or login by guest. 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
* Using this app, first you have to deploy [the timer api](https://github.com/sfuxy2283/serverless-timer-api) to your AWS.
* Any hosting service to deploy your single page application (e.g. S3, github page, heroku ...) 

### Installing
1. install the dependencies
```
npm install
```
1. change configure detials in [config.js](https://github.com/sfuxy2283/serverless-timer-client/blob/master/src/config.js)
```javascript
# inside config.js
export default {
  apiGateway: {
    REGION: "YOUR-API-GATEWAY-REGION",
    URL: "YOUR-API-GATEWAY-END-POINT-URL"
  },
  cognito: {
    REGION: "YOUR-COGNITO-REGION",
    USER_POOL_ID: "YOUR-COGNITO-USER-POOL-ID",
    APP_CLIENT_ID: "YOUR-COGNITO-APP-CLIENT-ID",
    IDENTITY_POOL_ID: "YOUR-COGNITO-IDENTITY-POOL-ID"
  }
};
```

## Deployment
Deploy this app to any hosting service that
[How to deploy single page application to AWS S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/WebsiteHosting.html)

## Built With
* [Create React App](https://github.com/facebook/create-react-app)
* [AWS sdk](https://github.com/aws/aws-sdk-js)
* [npm](https://npm.community/)

## Acknowledgments
* This app is inspired from [serverless-stack](https://serverless-stack.com/).

## How the timer works
### Components structure
<p align="center">
  <img src="https://github.com/sfuxy2283/serverless-timer-client/blob/master/timer.png" width="500" title="Github Logo">
</p>

## Database structure
Using DynamoDB that NOSQL database serviced by AWS.

userId - id of user
timerId - id of timer
title - title of timer
project - project name of timer
elapsed - elapsed time when the timer had been working before.
runningSience - the time that a start button was clicked. 

## How the app calculate timer from the data
1. When timer components are mounted, the app fetches data from database and pass the data to state of timer component.
1. User push the start button on the timer.
1. Timer component calculates elapsed time add elapsed from the state and substraction of now and the time when start button was clicked (elapsed + (now - runningSince).
1. Timer is updated every 500 milisecons whenever updated, new elapsed time is calculated.


### Start timer
Now - sinceFrom 



### Stop timer
total elapsed time  = preivous elapsed time + new elapsed time(the time user click stop button - running since)
runningSince = null
```javascript
  stopTimer = async timer => {
    const now = Date.now();
    const lastElapsed = now - timer.runningSince;
    const updatedElapsed = timer.elapsed + lastElapsed;
    try {
      await API.put("timers", `/timers/${timer.timerId}/stop`, {
        body: { elapsed: updatedElapsed }
      });
    ...
  };
```

## Sign up and Log in
Handle sign up and log in useing AWS Coginto.
Users can login by thier email
Coginto sends configuration mail to user

### Sign up process
1. User type email, password and confirm password on the sign up form and submit.
1. Cognito sends configuration mail to user to check the email is valid or not.
1. User type configuration code on the configure form and submit.
1. Cognito check the code and it is valid user singed up.

### Log in process
1. User type email and password on the login form and submit.
1. Cognito authenticates user and authorizate user by Identity pool.
1. Brower get JWT from Cognito and save it in the local storage

