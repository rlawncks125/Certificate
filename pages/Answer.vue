<script setup lang="ts">
import { storeToRefs } from "pinia";
import { list } from "postcss";
import useSolveQuestion, { SolveQuestion } from "~/store/useSolveQuestion";

import {} from "#imports";

const { lists } = storeToRefs(useSolveQuestion());
const { batchTest } = useSolveQuestion();

const router = useRouter();

const reBatch = () => {
  batchTest({
    short: {
      types: ["시스템보안", "네트워크보안"],
      count: 5,
    },
  }).then(() => router.push("/solve"));
};

const trueLists = ref<SolveQuestion[]>([]);
const falseLists = ref<SolveQuestion[]>([]);
const answerValue = ref(0);
const totlaValue = ref(0);

onMounted(() => {
  const copyLists = lists.value.map((v, i) => {
    const item = v;
    item.item["index"] = i + 1;
    return item;
  });

  trueLists.value = copyLists.filter((v) => v.isAnswer === true);
  falseLists.value = copyLists.filter((v) => v.isAnswer === false);

  answerValue.value = trueLists.value.reduce((a, b) => a + b.item.score, 0);

  totlaValue.value = lists.value.reduce((a, b) => a + b.item.score, 0);
});
</script>

<template>
  <div class="flex justify-between">
    <h1>결과</h1>
    <button @click="reBatch">다시 보기</button>
    <NuxtLink to="/">홈 으로</NuxtLink>
  </div>
  <p>{{ answerValue }}점 / 총{{ totlaValue }}점</p>
  <h2 class="text-green-400">정답</h2>
  <ClientOnly>
    <div v-if="trueLists" v-for="item in trueLists">
      <LazyQuestion :item="item.item" />
    </div>
  </ClientOnly>
  <h2 class="text-red-400">오답</h2>
  <ClientOnly>
    <div v-if="falseLists" v-for="item in falseLists">
      <LazyQuestion :item="item.item" />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped></style>
