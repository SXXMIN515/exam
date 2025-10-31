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
  const selected = [ 'title', 'writer', 'content', 'created_dt' ];
  let insertData = getInsertInfo(boardInfo, selected);
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

function getInsertInfo(target, selected){
  // selected : [ 'title', 'writer', 'content', 'created_dt' ]
  let info = [];
  for(let column of selected){
    let value = target[column];
    info.push(value);
  }
  return info;  
};

// 수정 : boardUpdate, [{'title' : '', 'writer' : '', ... }, 숫자]
const modifyBoard = async (no, upData)=>{
  let updateData = [ upData, no ];
  let result = await mysql.query("boardUpdate", updateData)
                .catch(err=> console.log(err));
  let resObj = {};  
  if(result.affectedRows > 0){
    resObj = { result : true, targetNo : no };
  } else {
    resObj = { result : false };
  }
  return resObj;
};

// 삭제
module.exports = {
  findAll,
  findByNo,
  createBoard,
  modifyBoard,
};
