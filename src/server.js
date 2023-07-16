const ApolloServer = require("apollo-server").ApolloServer;
const ApolloServerLambda = require("apollo-server-lambda").ApolloServer;
const { gql } = require("apollo-server-lambda");
const axios = require("axios");

const typeDefs = gql`
  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Query {
    users: [User]
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const users = await axios.get("https://api.github.com/users");
        return users.data.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }));
      } catch (error) {
        throw error;
      }
    },
  },
};

function createLambdaServer() {
  return new ApolloServerLambda({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    debug: true,
  });
}

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    debug: true,
  });
}

module.exports = { createLambdaServer, createLocalServer };
