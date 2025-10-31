// 각 서비스들을 목적에 따라 분리해서 라우팅을 설정
const express = require("express");
// Express의 Router 모듈을 사용해서 라우팅 등록, 라우팅을 별도 파일로 관리
const router = express.Router();

// 해당 라우터를 통해 제공할 서비스를 가져옴
const boardService = require("../services/board_service.js");

// 라우팅  = 사용자의 요청(URL+METHOD) + Service + 응답형태(View or Data)

// 실제 라우팅 등록 영역
//전체조회 : URI = /boards, METHOD = GET
router.get(`/boards`, async (req,res)=>{
    let list = await boardService.findAll()
                    .catch(err=> console.log(err));
    res.send(list);
});
//단건조회 : URI = /boards/:bno, METHOD = GET
router.get(`/boards/:bno`, async (req,res)=>{
    let no = req.params.bno;
    let info = await boardService.findByNo(no)
                    .catch(err=> console.log(err));
    res.send(info);
});
//등록     : URI = /boards, METHOD = POST
router.post(`/boards`, async (req,res)=>{
  let boardInfo = req.body;
  let result = await boardService.createBoard(boardInfo)
                  .catch(err=> console.log(err));
  res.send(result); 
});
//수정     : URI = /boards/:bno, METHOD = PUT
router.put(`/boards/:bno`, async (req,res)=>{
  let no = req.params.bno;
  let boardInfo = req.body;   
  let result = await boardService.modifyBoard(no, boardInfo)
                  .catch(err=> console.log(err));
  res.send(result); 
});

//삭제     : URI = /boards/:bno, METHOD = DELETE





// 해당 javascript 파일의 마지막 코드, 모듈화
// 위에 선언한 기능(변수, 함수 등)들 중 외부로 노출할 대상을 설정
// => 다른 파일에서 require()을 통해 가져옴
module.exports = router;
