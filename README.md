## Node version
App working against node v18.1.0 and expo-cli 5.4.3
Also working with node 16.15.0
 
 ## Setup
 ```
 yarn
 ```

## Run locally
```
yarn web
```

# Run tests
```
yarn test
```

## Deploy to firebase
You will need to install firebase tools
```
npm install -g firebase-tools

firebase login
```

Then to deploy (open console on root project folder)
```
yarn deploy
```
It will deploy to the project as defined inside .firebaserc

## View Live
https://openskill-test.web.app/
