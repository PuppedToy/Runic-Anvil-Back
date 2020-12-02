require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { readFileSync } = require('fs');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const api = require('./api');
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
    rootValue: api,
    graphiql: true,
  }),
);

app.get('/alive', (req, res) => {
  res.send('true');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
