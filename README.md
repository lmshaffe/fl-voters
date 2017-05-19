# fl-voters

### Configuration
In `config/app_config`, create a file called .env_dev. This file is not included in order to not share Mongo URIs. Within this config file, you are required to set two configruations, `APP_PORT_HTTP`, and `APP_MONGO_URI`.

### Running the app
#### Prerequisites
You must have `node v7.6` and up and `npm` already installed globally on your machine. This project is preferrably used with `yarn` to install packages and manage dependencies. If you do not have yarn just do an `npm install -g yarn`.

#### Start
Install packages using `yarn install` and once it's finished, just do an `npm start`

The app uses `gulp`, but it's not really doing much at the moment. It will just start the server and watch for changes and do automatic restarts.

### Routes
To start, the app has two voters endpoints. `/voters` and `/voters/:voterId`.

#####Parameters:
`/voters` takes the following query parameters:
+ **page** - Number. optional. defaults to page 1
+ **limit** - Number. optional. defaults to 50
+ **firstName** - String. optional.
+ **lastName** - String. optional.

`/voters/:voterId` accepts no query parameters and will only return one voter based on the voter ID.

In the future, more endpoints will be added based on how we will be searching for data.
