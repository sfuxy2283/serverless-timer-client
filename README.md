# Serverless Timer
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

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* Hat tip to anyone whose code was used
* Inspiration
* etc

# How the application works
## Components structure

## Database structure

## How the app calculate timer from the data

500초 마다 업데이트되어서 최근 시간을 유지할 수 있다
The timers update every 500 miliseconds so it kee

### Start timer
Now - sinceFrom 

```javascript
startTimer = async timerId => {
    try {
      const startTime = Date.now();
      await API.put("timers", `/timers/${timerId}/start`, {
        body: { start: startTime }
      });
     ...
  };
```

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

