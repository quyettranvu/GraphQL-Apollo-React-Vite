import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//Load schemas & resolvers
import typeDefs from "./schema/schema.js";
import resolvers from "./resolver/resolver.js";

//Load DB Methods
import mongoDataMethods from "./data/db.js";

//Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error(err);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ mongoDataMethods }),
});

const app = express();
server.start().then((res) => {
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
});
