const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");

const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient();

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    name: "qid",
    store: new RedisStore({ client: redisClient }),
    cookie: {
      sameSite: "lax",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
      secure: false,
    },
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false,
  })
);

mongoose.connect(
  "mongodb+srv://piyush:rhino11@cluster0.frvcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
);

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

app.use("/", authRoute);
app.use("/", postRoute);

app.get("/", (req, res) => {
  res.json("hello");
});
app.listen(5000);
