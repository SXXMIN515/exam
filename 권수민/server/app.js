const express = require("express");
const cors = require("cors");

const mysql = require("./sql/index");

// express app setup
const app = express();
const port = 3000;

// 정적디렉토리 설정.
app.use(express.static("public"));
app.use(cors());

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("board");
});

// 게시글 전체조회
app.get("/boards", async (req, res) => {
  let result = await mysql.queryExecute(
    `SELECT b.no, 
            b.title, 
	          b.writer, 
	          b.created_dt AS created_date,
            COUNT(c.no) AS comment_count
     FROM board_tbl b
     LEFT OUTER JOIN comment_tbl c
     ON b.no = c.bno
     GROUP BY b.no, b.title, b.writer, b.created_dt, c.bno
     ORDER BY b.no ASC`,
    []
  );
  res.send(result);
});

// 게시글 단건조회
app.get("/board/:no", async (req, res) => {
  const no = req.params.no;
  let result = await mysql.queryExecute(
    `SELECT no, 
            created_dt AS created_date,
            title, 
	          writer, 
            content
            FROM board_tbl WHERE no = ?`,
    no
  );
  res.send(result);
});

// 게시글 등록
app.post("/board", async (req, res) => {
  const param = req.body.param; // {title: 'test', content: 'content'}
  // insert 쿼리 실행.
  let result = await mysql.queryExecute(`INSERT INTO board_tbl SET ?`, param);
  res.send(result);
});

// 게시글 수정
app.put("/board", async (req, res) => {
  const param = req.body.param; // [{title: 'test', content: 'content'}, 6]
  // update 쿼리 실행.
  let result = await mysql.queryExecute(
    `UPDATE board_tbl SET ? WHERE no = ?`,
    param
  );
  res.send(result);
});

// 댓글 조회
app.get("/comment/:no", async (req, res) => {
  const no = req.params.no;
  let result = await mysql.queryExecute(
    `SELECT r.* 
     FROM comment_tbl c
     JOIN board_tbl b
     ON c.bno = b.no
     WHERE c.no = ?`,
    no
  );
  res.send(result);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`http://localhost:${port}`);
});
