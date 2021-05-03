const express = require("express");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const socketio = require("socket.io");

const app = express();
const port = 3000;

//template egine setup
app.set("view engine", "html");
app.engine("html", ejs.renderFile); //ejs.renderFile this way we can use [.html] as our file extension

//Public folder setup
app.use(express.static(__dirname + "/public"));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.render("index");
});

const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
