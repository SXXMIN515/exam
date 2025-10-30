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
      <button class="btn btn-info" @click="addBoard">저장</button>
    </template>
  </BoardForm>
</template>

<script setup>
import BoardForm from "@/components/BoardForm.vue";
import { reactive, computed } from "vue";
import axios from "axios";
// import dateFormat from "@/utils/dateFormat";

const boardInfo = reactive({
  no: "",
  title: "",
  writer: "",
  content: "",
});

const formattedDate = computed(() => {
  if (boardInfo.value.write_date) return new Date(boardInfo.value.write_date).toLocaleString();
  return "";
});

const addBoard = () => {
  axios
    .post("http://localhost:3000/board")
    .then((resp) => {
      console.log(resp);
      boardInfo.value = resp.data;
      console.log(boardInfo.value);
    })
    .catch((err) => console.log(err));
};
</script>
