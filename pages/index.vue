<script setup lang="ts">
import { storeToRefs } from "pinia";

import useSolveQuestion from "~/store/useSolveQuestion";
import { useQuestionLists } from "~/store/useQuestionLists";

const {
  public: { isDeploy },
} = useRuntimeConfig();

// const chapter1 = await useFetch("/api/chapter-01-short");

const { lists } = storeToRefs(useSolveQuestion());

const { questionLists } = storeToRefs(useQuestionLists());
const { getQuestion, reset: questionReset } = useQuestionLists();

// const questionLists = useState<any[]>("문제 배열", () => []);
// const { getAllQuestion } = useQuestion();
// getAllQuestion().then((res) => {
//   questionLists.value = res;
//   questionLists.value.sort((a, b) => b.index - a.index);
// });
</script>

<template>
  <!-- <ClientOnly>
    <div>{{ lists }}</div>
  </ClientOnly> -->

  <div class="flex justify-between">
    <span> Home </span>
    <NuxtLink v-if="!isDeploy" to="/CreateQuestion">문제 생성</NuxtLink>
    <NuxtLink to="/solve">문제 풀기</NuxtLink>
  </div>

  <ClientOnly>
    <h2>GUN BBANG !!!</h2>
    <div class="flex gap-4">
      <button @click="getQuestion('서술형1')">서술형 1</button>
      <button @click="questionReset">초기화</button>
    </div>
    <div v-if="questionLists" v-for="item in questionLists">
      <LazyQuestionDesign v-if="item" :item="item" />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
p {
  word-wrap: break-word;
  word-break: keep-all;
}
</style>
