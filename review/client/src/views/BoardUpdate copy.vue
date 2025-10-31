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
      <input class="form-control" type="date" v-model="formattedDate" readonly />
    </template>
    <template v-slot:button>
      <button class="btn btn-info" @click="modifyBoard">저장</button>
    </template>
  </BoardForm>
</template>

<script setup>
import BoardForm from "@/components/BoardForm.vue";
import dateFormat from "@/utils/dateFormat";
import { reactive, computed, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const boardInfo = reactive({
  no: "",
  title: "",
  writer: "",
  content: "",
  created_dt: new Date(),
});

const formattedDate = computed(() => {
  return dateFormat(boardInfo.created_dt, "yyyy-MM-dd");
});

onMounted(() => {
  const query = route.query;

  boardInfo.no = query.no;
  boardInfo.title = query.title;
  boardInfo.writer = query.writer;
  boardInfo.content = query.content;
  boardInfo.created_dt = new Date(query.created_dt);
});

const modifyBoard = async () => {
  let obj = {
    title: boardInfo.title,
    writer: boardInfo.writer,
    content: boardInfo.content,
  };

  let result = await axios.put(`/api/boards/${boardInfo.no}`, obj).catch((err) => console.log(err));

  let modifyRes = result.data;
  if (modifyRes.result) {
    alert("게시글이 수정되었습니다.");
    router.push({ name: "boardInfo", query: { no: boardInfo.no } }); // 상세보기로 이동
  } else {
    alert("게시글 수정에 실패하였습니다.");
  }
};
</script>
