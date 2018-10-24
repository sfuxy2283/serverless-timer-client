# Serverless Timer

Simple timer app that works with AWS Ramda to handle user's requests

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Using this app, first you have to deploy [the timer api](https://github.com/sfuxy2283/serverless-timer-api) to your AWS.
* Any hosting service to deploy your single page application (e.g. S3, github page, heroku ...) 

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* (http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* AWS sdk(https://maven.apache.org/) - Dependency Management

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Example site
you can use this web app after signup or login by guest. 

# How to use it
1. npm install
```
npm install
```

1. change configure detials in config.js

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

1. deploy to hosting service (How deploy static homepage on the AWS S3)

# How the application works
## Components structure

## Database structure

## How the app calculate timer from the data

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

