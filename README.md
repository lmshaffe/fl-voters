# fl-voters

### Configuration
In `config/app_config`, create a file called .env_dev. This file is not included in order to not share Mongo URIs. Within this config file, you are required to set two configruations, `APP_PORT_HTTP`, and `APP_MONGO_URI`.

### Running the app
#### Prerequisites
You must have `node` and `npm` already installed globally on your machine. This project is preferrably used with `yarn` to install packages and manage dependencies. If you do not have yarn just do a `npm install -g yarn`.

#### Start
Just do an `npm start`


The app uses `gulp`, but it's not really doing much at the moment. It will just start the server and watch for changes and do automatic restarts.

### Routes
To start, the app has two voters endpoints. `/voters` and `/voters/:voterId`. The former will return the first 10 voters, and the latter will return the voter that you have provided the ID for.

In the future, we will probably need to send a JSON request body and let the API decide how to find the voter. The app will have many different ways to find a voter, so the endpoint will probably end up being just `/voters` with a request body.
