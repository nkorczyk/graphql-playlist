const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://norbert:test123@gql.d92kr.mongodb.net/gql?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error: ", err.message));

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
