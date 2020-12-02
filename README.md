# Runic-Anvil-Back
The GraphQL API for the game Runic Anvil

<img src="coverage/badge-branches.svg"> <img src="coverage/badge-functions.svg"> <img src="coverage/badge-lines.svg"> <img src="coverage/badge-statements.svg">

## How to install

1. Run `npm install`
2. Run `cp .env.sample .env`
3. Fill .env information with actual data

## The database

This application uses MongoDB. To use it, you must have an instance running and the .env configured appropietly. If you don't know and don't care about how to do it, just use the docker command to run it:

Setup: `npm run docker:setup`
Run: `npm run docker:run`
Stop: `npm run docker:stop`

## How to run

If you have your database up and running and the setup prepared, just execute: `npm start`.

You are ready to go! You can interact with the API on http://localhost:3000/graphql if you use the 3000 port.

## Linting

All the code needs to pass certain criteria in order to make commits. This is handled by eslint. Code is automatically fixed on every commit (if possible). You won't be able to commit code if eslint doesn't approve the code.

## Testing

The project uses automating testing through Jest. To test the code, keep in mind that you have to create an environment file for testing. To do so, execute: `cp .env .env.test` and fill it with testing data. Keep in mind that the database will be deleted every time you test, so try to use another instance. 

Two commands are needed to test:
1. `npm test` to test
2. `npm run badges` to generate que coverage badges that are shown at the top of this file. This is only required before each release.

