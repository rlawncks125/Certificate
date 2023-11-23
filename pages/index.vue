<script setup lang="ts">
import { storeToRefs } from "pinia";

import useSolveQuestion from "~/store/useSolveQuestion";

const {
  public: { isDeploy },
} = useRuntimeConfig();

// const chapter1 = await useFetch("/api/chapter-01-short");
const questionLists = useState<any[]>("문제 배열", () => []);

const { lists } = storeToRefs(useSolveQuestion());
const { getQuestionsSelect, getAllQuestion } = useQuestion();

// getAllQuestion().then((res) => {
//   questionLists.value = res;
//   questionLists.value.sort((a, b) => b.index - a.index);
// });

getQuestionsSelect({
  // short: ["정보보안 괸리/법규"],
  desc: [
    "네트워크보안",
    "시스템보안",
    "어플리케이션보안",
    "정보보안 괸리/법규",
    "정보보안 일반",
    "침해사고 분석 및 대응",
  ],
  // working: ["정보보안 괸리/법규"],
  // other: ["직무면접"],
}).then((res) => {
  // const selectedNumbers = [729];
  const selectedNumbers = [
    519, 661, 821, 494, 517, 650, 816, 318, 492, 319, 347, 493, 336, 111, 328,
    812, 348, 104,
  ];

  questionLists.value = res.flat(2);

  questionLists.value = questionLists.value.filter((v: any) =>
    selectedNumbers.includes(+v.index)
  );
  console.log(questionLists.value);

  questionLists.value.sort((a, b) => b.index - a.index);
  // questionLists.value = res;
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
    <h2>GUN BBANG !!!</h2>
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
