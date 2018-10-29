# Serverless Timer - client
Simple timer app that works without server, using AWS Ramda to handle user's requests

## Example site
[Serverless-timer](http://serverless-timer-client.s3-website.ap-northeast-2.amazonaws.com/)
You can use this web app after signup or login by guest. 

## Getting Started
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
* [Material UI](https://github.com/mui-org/material-ui)
* [AWS sdk](https://github.com/aws/aws-sdk-js)
* [npm](https://npm.community/)

## Acknowledgments
* This app is inspired from [serverless-stack](https://serverless-stack.com/).

## How this app works
### Components structure
<p align="center">
  <img src="https://github.com/sfuxy2283/serverless-timer-client/blob/master/timer_structure.png" width="500" title="diagram">
</p>

#### TimerContainer
Fetches datas about timers from the database and renders child compoenets.
#### EditableTimer
If user press edit button, it displays TimerForm component, otherwise, display Timer component.
#### Timer
It displays elapsed time. User can start, stop, delete and edit timer
#### TimerForm
User can edit title and project of timer.
#### AddTimerButton
If user push this button, it changes to timer form to add new timer into timer container.

### Database structure
Using DynamoDB that NOSQL database serviced by AWS.
* userId - id of user
* timerId - id of timer
* title - title of timer
* project - project name of timer
* elapsed - elapsed time when the timer had been working before.
* runningSience - the time that a start button was clicked. 

### Logic in timer
1. Timer component displayes elapsed.
1. If user click "Start" button, set runningSince to the start time.
1. Timer component calculates the differnce between the strat time. and the current time and add it to previous elapsed time.
1. Timer is updated every 500 milisecons, when it is re-rendered, it calculates new elapsed time using same logic(elapsed + (now - runningSince)).
1. When user clicks "Stop" button, the difference between the start time and the current time is added to elapsed and runningSince is set to null.
