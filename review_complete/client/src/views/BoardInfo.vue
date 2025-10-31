<template>
  <div class="container">
    <table class="table">
      <tbody>
        <tr>
          <th class="text-right">번호</th>
          <td class="text-center">{{ boardInfo.no }}</td>
        </tr>
        <tr>
          <th class="text-right">작성일</th>
          <td class="text-center">{{ dateFormat(boardInfo.created_dt, "yyyy-MM-dd") }}</td>
        </tr>
        <tr>
          <th class="text-right">제목</th>
          <td class="text-center">{{ boardInfo.title }}</td>
        </tr>
        <tr>
          <th class="text-right">이름</th>
          <td class="text-center">{{ boardInfo.writer }}</td>
        </tr>
        <tr>
          <th class="text-right">내용</th>
          <td class="text-center">{{ boardInfo.content }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="btn btn-primary" @click="goToboardUpdate">수정</button>
    </div>
    <hr />
  </div>
  <CommentComponent v-bind:no="no" />
</template>

<script setup>
import CommentComponent from "../components/CommentComponent.vue";
import dateFormat from "@/utils/dateFormat.js";
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();

let boardInfo = ref({}); // 게시글 정보
const getBoardInfo= async(bno) => {
    // 단건조회    http://localhost:3000/boards/100
    let result = await  axios.get(`/api/boards/${bno}`)
                              .catch(err=>console.log(err));
    boardInfo.value = result.data;
};

import { useRouter } from "vue-router";
const router = useRouter();

const goToboardUpdate = ()=> {
  const bno = boardInfo.value.no;
  router.push({ name: "boardAdd", query: { no: bno } });
};

onBeforeMount(()=>{
    const boardNo = route.query.no;
    getBoardInfo(boardNo);
});   
</script>
