"use strict";
const route = require("express").Router();
const post = require("../controller/post");
const { authenticateUser } = require("../middleware/checkLoggedIn");

route.post("/post", authenticateUser, post.post);
route.post("/comment", authenticateUser, post.comment);
route.post("/like", authenticateUser, post.like);
route.post("/getAll", authenticateUser, post.getAll);
route.post("/get", post.get);

module.exports = route;
