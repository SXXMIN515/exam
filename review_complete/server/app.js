require('dotenv').config({path: './database/dbConfig.env'});

const express = require("express");
const app = express();
const port = 3000;

// 1. 미들웨어 영역
// body parser
// content-type : application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// content-type : application/json
app.use(express.json());

// 2. Server 실행
app.listen(port, () => {
  console.log("Server Strat");
  console.log(`http://localhost:${port}`);
});

// 3. 라우팅 영역

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const boardRouter = require("./routes/board_router.js");

app.use("/", boardRouter);
