// 각 테이블 별로 실행한 SQL문을 별도 파일로 작성
const boards = require("./sqls/boards.js");

module.exports = {
  // 펼침연산자(spread operator, ...)을 활용해 객체의 필드를 다른 객체로 쉽게 복사
  ...boards,
  /*
  selectboardList : `SELECT ...`,
  selectboardOne : `SELECT ...`,
  boardInsert : `INSERT ...`,
  boardUpdate : `UPDATE ...`,
  boardDelete : `DELETE ...`,
  
  => sqlList["selectboardList"]  형태로 접근 가능
*/
};
