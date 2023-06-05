<script setup lang="ts">
import { storeToRefs } from "pinia";
import useSolveQuestion from "~/store/useSolveQuestion";

const {
  public: { isDeploy },
} = useRuntimeConfig();

const chapter1 = await useFetch("/api/chapter-01-short");
const questionLists = useState<any[]>("문제 배열", () => []);

const { lists } = storeToRefs(useSolveQuestion());
const { getAllQuestion } = useQuestion();

getAllQuestion().then((res) => {
  questionLists.value = res;
});

onMounted(async () => {
  console.log(questionLists.value);
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
      <LazyQuestion v-if="item" :item="item" />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.da {
}
</style>
