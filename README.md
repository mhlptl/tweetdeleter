# Tweet Deleter

This web application allows a user to mass delete one or more of their tweets given the tweet IDs. Using an Express Backend to interact with the Twitter API and a React Frontend to display a form (to input tweet IDs) and the results after the API call to Twitter.

To interact with the Twitter API, I used the oauth-1.0a npm module which created the Authorization header needed to authenticate with Twitter. Using axios, a request for each tweet ID is sent to Twitter for deletion. Upon completion, the user is shown the results (whether the tweet has been deleted or not).

To get started, go to the [Twitter Developer](https://developer.twitter.com/en "Twitter Developer Home") website and create an app to receive your own:

- Consumer Key
- Consumer Secret
- Access Token Key
- Access Token Secret

Once the tokens are received, you can add them into your environment variables to use with this application.

To use, run **npm install** and then run **npm run dev** to run the backend and frontend concurrently. This will use PORT 3000 for the react app and PORT 5000 for the server. The webpage located at http://localhost:3000 will be the webpage where you can input the tweetIDs for deletion. For simplicity, each tweet ID should be on a seperate line.