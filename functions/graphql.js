const { createLambdaServer } = require("./bundle/server");

const getHandler = (event, context) => {
  const server = createLambdaServer();
  const graphqlHandler = server.createHandler({ path: "/data" });
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
