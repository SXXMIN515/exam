// 실제 기능을 담당하는 함수들의 모음
const mysql = require("../database/mapper.js");

// 실제 제공할 서비스 등록

// 전체조회
const findAll = async () => {
  let list = await mysql.query("selectboardList")
                      .catch((err) => {
                          console.log(err);
                          return { err: "DB조회중 오류발생" };
                });
  return list;
};

// 단건조회
const findByNo = async (boardNo)=>{
  let list = await mysql.query("selectboardOne", boardNo)
                      .catch(err=> console.log(err));
  let info = list[0];
  return info;
}

// 등록

const createBoard = async (boardInfo)=>{
  // insertData =  [ title, writer, content, created_dt ]
  let insertData = getInsertInfo(boardInfo);
  let result = await mysql.query("boardInsert", insertData)
                .catch(err=> console.log(err));
  let resObj = {};
  if(result.insertId > 0){ // AUTO_INCREMENT가 적용된 PK값이 반환
    resObj = { result : true, bno : result.insertId};
  } else {
    resObj = { result : false };
  }
  return resObj;
}

function getInsertInfo(info){
  let aray = [];
  aray.push(info.title);
  aray.push(info.writer);
  aray.push(info.content);
  aray.push(info.created_dt);
  return aray;  
};

// 수정

// 삭제
module.exports = {
  findAll,
  findByNo,
  createBoard,
};
