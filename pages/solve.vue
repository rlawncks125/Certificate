<script setup lang="ts">
import { storeToRefs } from "pinia";
import { SolveQuestion } from "~/common/type";
import useSolveQuestion from "~/store/useSolveQuestion";

const router = useRouter();
const { lists, solveIndex } = storeToRefs(useSolveQuestion());
const { update } = useSolveQuestion();

const reBatch = () => {
  router.push("/bacthsolve");
};

const handlerUpdate = (item: SolveQuestion) => {
  update(solveIndex.value, item);
  solveIndex.value++;
};

watch(solveIndex, () => {
  solveIndex.value < 0 ? (solveIndex.value = 0) : "";

  solveIndex.value >= lists.value.length
    ? (solveIndex.value = lists.value.length - 1)
    : "";
});
</script>

<template>
  <div>문제푸는 페이지</div>
  <div class="flex justify-between">
    <button @click="reBatch">문제 재배치</button>
    <NuxtLink to="/">HOME</NuxtLink>
    <NuxtLink to="answer">결과 보러가기</NuxtLink>
  </div>

  <ClientOnly>
    <div v-if="lists" v-for="(question, _index) in lists">
      <Transition name="left-right" mode="out-in">
        <div v-if="_index === solveIndex">
          <div>
            {{
              question.isAnswer === null
                ? "Null값"
                : question.isAnswer
                ? "정답"
                : "오답"
            }}
          </div>

          <LazyQuestionSolve
            :item="question.item"
            :item-index="_index + 1"
            @update:next="handlerUpdate"
            @btn:next="solveIndex++"
            @btn:pre="solveIndex--"
          />
        </div>
      </Transition>
    </div>
    <div v-else>Loding...</div>
  </ClientOnly>
</template>

<style lang="scss">
.left-right-enter-active,
.left-right-leave-active {
  transition: all 0.2s ease-out;
}

.left-right-enter-from {
  position: absolute;
  opacity: 0;
  transform: translateX(-100vh);
}
.left-right-leave-to {
  display: none;
}
</style>
