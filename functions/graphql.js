// const { createLambdaServer } = require("./bundle/server");

// const server = createLambdaServer();

const getHandler = (event, context) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
  });
  const graphqlHandler = server.createHandler();
  if (!event.requestContext) {
    event.requestContext = context;
  }
  return graphqlHandler(event, context);
};

exports.handler = getHandler;

// exports.handler = server.createHandler({
//   cors: {
//     origin: "*",
//   },
// });
