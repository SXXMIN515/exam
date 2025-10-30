import { ref, computed } from "vue";
// import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useBoardStore = defineStore("board", () => {
  // state
  const boardList = ref([]);
  // getters
  const count = computed(() => boardList.value.length);
  // actions
  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3000/boards");
    boardList.value = response.data;
  };

  return { boardList, count, fetchPosts };
});
