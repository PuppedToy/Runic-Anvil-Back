require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { readFileSync } = require('fs');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

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

app.use(express.json());
app.use('/api', restApi);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint not found',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
  });
});

module.exports = app;
