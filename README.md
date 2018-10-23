This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Example site
you can use this web app after signup or login by guest. 

# How to use it
1. npm install
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

### Stop timer
total elapsed time  = preivous elapsed time + new elapsed time(the time user click stop button - running since)
runningSince = null

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

