# Tweet Deleter

This web application allows a user to mass delete one or more of their tweets given the tweet IDs. Using an Express Backend to interact with the Twitter API and a React Frontend to display a form (to input tweet IDs) and the results after the API call to Twitter.

To interact with the Twitter API, I used the oauth-1.0a npm module which created the Authorization header needed to authenticate with Twitter. Using axios, a request for each tweet ID is sent to Twitter for deletion. Upon completion, the user is shown the results (whether the tweet has been deleted or not).