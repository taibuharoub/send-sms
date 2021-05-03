const express = require("express");
const ejs = require("ejs");
const Nexmo = require("nexmo");
const socketio = require("socket.io");

const app = express();
const port = 3000;

//Init Nexmo
const nexmo = new Nexmo(
  {
    apiKey: "<insert your api key>",
    apiSecret: "<insert your api secret>",
  },
  { debug: true }
);

//template egine setup
app.set("view engine", "html");
app.engine("html", ejs.renderFile); //ejs.renderFile this way we can use [.html] as our file extension

//Public folder setup
app.use(express.static(__dirname + "/public"));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Index route
app.get("/", (req, res, next) => {
  res.render("index");
});

//Catch from submit
app.post("/", (req, res, next) => {
  //   res.send(req.body);
  //   console.log(req.body);
  //   const { number, text } = req.body;
  const number = req.body.number;
  const text = req.body.text;

  nexmo.message.sendSms(
    "<virtual number>",
    number,
    text,
    { type: "unicode" },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        // get data from response 
        const data = {
            id: responseData.messages[0]["message-id"],
            number: responseData.messages[0]["to"]
        }

        //emit to the client
        io.emit("smsStatus", data);
      }
    }
  );
});

const server = app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

//Connect to socket.io
const io = socketio(server);
io.on("connection", (socket) => {
    console.log("Connected");
    io.on("disconnect", () => {
        console.log("Disconnected");
    })
})