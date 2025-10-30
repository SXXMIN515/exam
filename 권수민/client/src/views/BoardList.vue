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
            <td>{{ dateFormat(boardInfo.created_date, "yyyy-MM-dd") }}</td>
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
// import { useBoardStore } from "@/stores/board";
// import { ref, onBeforeMount } from "vue";

// const boardStore = useBoardStore();

// const boardList = ref([]);

// const count = boardStore.count;

// onBeforeMount(async () => {
//   await boardStore.fetchPosts();
//   const result = await boardStore.fetchPosts();
//   boardList.value = result;
// });
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const boardList = ref([]);

const count = computed(() => boardList.value.length);

axios
  .get("http://localhost:3000/boards")
  .then((resp) => {
    console.log(resp);
    boardList.value = resp.data;
    console.log(boardList.value);
  })
  .catch((err) => console.log(err));

const goToBoardInfo = async (no) => {
  router.push({ name: "boardInfo", query: { no } });
};
</script>
