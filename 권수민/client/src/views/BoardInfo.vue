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
          <td class="text-center">{{ dateFormat(boardInfo.created_date, "yyyy-MM-dd") }}</td>
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute(); // 라우트 정보 접근

const boardInfo = ref({});

onMounted(async () => {
  const result = await axios.get(`http://localhost:3000/board/${route.query.no}`);
  console.log("Post Data:", result.data);
  boardInfo.value = result.data[0];
});
</script>
