const cors = require("cors");

const express = require("express");
const userRouter = require("./routes/user.routes");
const conn = require("./app");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRouter);

conn.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  } else {
    console.log("Ok");
  }
});

app.listen(PORT, () => console.log("Started!"));
