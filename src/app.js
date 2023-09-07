require('dotenv').config();
const { readFileSync } = require('fs');
const express = require('express');
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { ValidationError } = require('express-validation');

const graphqlApi = require('./graphqlApi');
const restApi = require('./restApi');
const { authMiddleware } = require('./utils/middlewares');

const app = express();
const port = process.env.PORT;

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(authMiddleware);

const graphqlSchemaPath = process.env.GRAPHQL_SCHEMA_PATH || '../schema.graphql';
const schema = String(readFileSync(`${__dirname}/${graphqlSchemaPath}`));
const MyGraphQLSchema = buildSchema(schema);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: MyGraphQLSchema,
    rootValue: graphqlApi,
    graphiql: true,
  }),
);

app.get('/alive', (req, res) => {
  res.send('true');
});

let staticFiles = null;
if (process.env.FILE_DIR) {
  staticFiles = process.env.FILE_DIR.replace(/.*\/(.*)/, '$1');
  app.use('/pics', express.static(staticFiles));
}

app.use(express.json());
app.use('/api', restApi);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.message,
      errors: err.details,
    });
  }

  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error(err.stack);
  }
  res.status(500).json({
    message: 'Internal server error',
  });
});

module.exports = { app, server };
