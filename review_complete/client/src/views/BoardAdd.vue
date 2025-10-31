<template>
  <BoardForm>
    <template v-slot:no>
      <input class="form-control" type="text" v-model="boardInfo.no" readonly />
    </template>
    <template v-slot:title>
      <input class="form-control" type="text" v-model="boardInfo.title" />
    </template>
    <template v-slot:writer>
      <input class="form-control" type="text" v-model="boardInfo.writer" />
    </template>
    <template v-slot:content>
      <textarea class="form-control" v-model="boardInfo.content"></textarea>
    </template>
    <template v-slot:created_date>
      <!-- yyyy-MM-dd   -->
      <input class="form-control" type="date" v-model="formattedDate" readonly />
    </template>
    <template v-slot:button>
      <button class="btn btn-info" @click="isUpdated ? modifyBoard() : addBoard()">저장</button>
    </template>
  </BoardForm>
</template>

<script setup>
import BoardForm from "@/components/BoardForm.vue";
import { ref, computed, onBeforeMount } from "vue";
import dateFormat from "@/utils/dateFormat";

const boardInfo = ref({
  no: "",
  title: "",
  writer: "",
  content: "",
  created_dt: new Date(),
});

const formattedDate = computed(() => {
  return dateFormat(boardInfo.value.created_dt, "yyyy-MM-dd");
});

import axios from "axios";
const addBoard = async ()=>{
  let obj = {
    title : boardInfo.value.title,
    writer: boardInfo.value.writer,
    content: boardInfo.value.content,
    created_dt: formattedDate.value,
  };

  let result = await axios.post(`/api/boards`, obj)
                            .catch(err=>console.log(err));

  let addRes = result.data;
  if(addRes.result){
    alert("게시글이 추가되었습니다.");
    boardInfo.value.no = addRes.bno;
  }else{
    alert("게시글 추가에 실패하였습니다.");
  }
};

const isUpdated = ref(false);
const modifyBoard = async ()=>{
  let obj = {
    title : boardInfo.value.title,
    writer: boardInfo.value.writer,
    content: boardInfo.value.content,
    created_dt: formattedDate.value,
  };

  let result = await axios.put(`/api/boards/${boardInfo.value.no}`, obj)
                            .catch(err=>console.log(err));

  let addRes = result.data;
  if(addRes.result){
    alert("게시글이 수정되었습니다.");
  }else{
    alert("게시글 수정에 실패하였습니다.");
  }
};

import { useRoute } from "vue-router";
const route = useRoute();

const getBoardInfo= async(bno) => {
    // 단건조회    http://localhost:3000/boards/100
    let result = await  axios.get(`/api/boards/${bno}`)
                              .catch(err=>console.log(err));
    boardInfo.value = result.data;
};

onBeforeMount(()=>{
    const boardNo = route.query.no;
    if(boardNo > 0){
      isUpdated.value = true;
      getBoardInfo(boardNo);
    }else{
      boardInfo.value.created_dt = new Date();
    }
}); 
</script>
