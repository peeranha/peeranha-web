# README

## Application Setup

### Setup
#### Clone the repository
```
git clone https://github.com/peerania/peerania-web 
cd peerania-web
```

#### Install dependencies
Install at least Node v8.4.0 if you don't already have it. The app is known to successfully build using node 8.4.0 and npm 5.5.1. Run the following command to install project dependencies: 
```
npm install
```

### Configuration
Create a `.env` file in the working directory. Add environment-specific variables on new lines in the form of `NAME=VALUE`, for instance:
```
HOST=127.0.0.1
PORT=8080
DEFAULT_LOCALE=en
```

### Running the build
Run the applicaiton in development mode:
```
npm run dev
```
All available scripts are listed in a table below

| Npm Script | Description |
| ------------- | ----------------------------------------------------------------------------- |
| `dev`         | Runs an application in development mode                                       |
| `build:dev`   | Builds an applicaiton in development mode and copies output to `dist` folder  |
| `build:prod`  | Builds an applicaiton in production mode and copies output to `dist` folder   |
| `test`        | Runs tests using Jest test runner                                             |

### Dependencies

### Deployment instructions
