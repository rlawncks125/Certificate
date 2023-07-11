<script setup lang="ts">
import { storeToRefs } from "pinia";

import useSolveQuestion from "~/store/useSolveQuestion";

const {
  public: { isDeploy },
} = useRuntimeConfig();

const chapter1 = await useFetch("/api/chapter-01-short");
const questionLists = useState<any[]>("문제 배열", () => []);

const { lists } = storeToRefs(useSolveQuestion());
const { getQuestionsSelect, getAllQuestion } = useQuestion();

// getAllQuestion().then((res) => {
//   questionLists.value = res;
//   questionLists.value.sort((a, b) => b.index - a.index);
// });

getQuestionsSelect({
  // short: ["네트워크보안"],
  // working: ["시스템보안"],
  other: ["기타기사"],
}).then((res) => {
  questionLists.value = res.flat(2);
  questionLists.value.sort((a, b) => b.index - a.index);
});
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
    <div v-if="questionLists" v-for="item in questionLists">
      <LazyQuestionDesign v-if="item" :item="item" />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
p {
  word-wrap: break-word;
}
</style>
