<script setup lang="ts">
import { storeToRefs } from "pinia";
import useSolveQuestion from "~/store/useSolveQuestion";

const chapter1 = await useFetch("/api/chapter-01-short");
const questionLists = useState<any[]>("문제 배열", () => []);

const { lists } = storeToRefs(useSolveQuestion());
const { getAllQuestion } = useQuestion();

getAllQuestion().then((res) => {
  questionLists.value = res;
});

onMounted(() => {
  console.log(questionLists.value);
});

/** '로 묶은 단어 강조 '하이라이트 텍스트' */
const highlightText = (text: string) => {
  return text.replace(/\'(.*?)\'/g, "<span class='text-red-500'>$1</span>");
};
</script>

<template>
  <div>
    <!-- <ClientOnly>
      <div>{{ lists }}</div>
    </ClientOnly> -->
    <span> Home </span>
    <NuxtLink to="/CreateQuestion">문제 생성</NuxtLink>
  </div>

  <ClientOnly>
    <div v-if="questionLists" v-for="item in questionLists">
      <LazyQuestion :item="item" />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
body {
  @apply px-[1rem];

  white-space: pre-wrap;
}

table {
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #444444;
  padding: 10px;
}
</style>
