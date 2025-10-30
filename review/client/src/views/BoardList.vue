<template>
  <div class="container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>댓글 수</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="count > 0">
          <tr
            v-for="boardInfo of boardList"
            v-bind:key="boardInfo.no"
            @click="goToBoardInfo(boardInfo.no)"
          >
            <td>{{ boardInfo.no }}</td>
            <td>{{ boardInfo.title }}</td>
            <td>{{ boardInfo.writer }}</td>
            <td>{{ dateFormat(boardInfo.created_dt, "yyyy-MM-dd") }}</td>
            <td>{{ boardInfo.comment_count }}</td>
          </tr>
        </template>
        <tr v-else>
          <td>표시할 내용 없음</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import dateFormat from "@/utils/dateFormat.js";
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

let boardList = ref([]); // 게시글 목록
const count = computed(() => boardList.value.length); // 게시글 총 갯수

const getBoardList = async () => {
  // 전체조회   http://localhost:3000/boards
  let result = await axios.get(`/api/boards`).catch((err) => console.log(err));
  boardList.value = result.data;
};

const goToBoardInfo = (bno) => {
  router.push({ name: "boardInfo", query: { no: bno } });
};

onBeforeMount(() => {
  getBoardList();
});
</script>
