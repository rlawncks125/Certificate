<script setup lang="ts">
import { QuestionProperty } from "~/common/type";
import { type SolveQuestion } from "~/common/type";

const { item, itemIndex } = defineProps<{
  item: QuestionProperty;
  itemIndex?: number;
}>();

const emtis = defineEmits<{
  (e: "update:next", item: SolveQuestion): void;
  (e: "btn:next"): void;
  (e: "btn:pre"): void;
}>();

const answer = ref(item["제출란"] || "");
const textareaRef = ref();

const answerTrue = () => {
  emtis("update:next", {
    item: {
      ...item,
      제출란: answer.value,
    },
    isAnswer: true,
  });
};
const answerFalse = () => {
  emtis("update:next", {
    item: {
      ...item,
      제출란: answer.value,
    },
    isAnswer: false,
  });
};

onMounted(() => {
  if (!textareaRef.value) return;
  textareaRef.value.style.height = "auto";
  const scrollHeight = textareaRef.value.scrollHeight + 4;
  textareaRef.value.style.height = scrollHeight + "px";

  console.log("Item mounted");
});
</script>

<template>
  <div class="wrap">
    <div class="py-[.4rem]">
      <p class="flex items-top gap-1">
        <span> {{ itemIndex || item["index"] }}. </span>
        <span v-html="item['질문']"> </span>
      </p>
    </div>

    <div
      class="my-[1rem] py-[1rem] p-2 relative"
      :style="{ border: '1px solid' }"
      v-if="item['보기src'].length > 0 || item['보기'].length > 0"
    >
      <div v-if="item['보기src'].length > 0">
        <img
          :src="item['보기src'].replace(/upload/, 'upload/w_400,h_400/')"
          alt="문제 보기입니다."
        />
      </div>
      <p v-else v-html="item['보기']"></p>
      <span
        class="absolute -top-3 left-2 bg-white px-[5px] py-[2px] border border-black text-[12px]"
        :style="{ border: '1px solid' }"
        >보기</span
      >
    </div>
    <div class="flex flex-col">
      <label for="" class="">정답 작성 </label>
      <textarea
        ref="textareaRef"
        class="border-2 border-black p-2"
        @input="textareaAutoHieghtByInputHandler"
        v-model="answer"
      >
      </textarea>
    </div>
    <div class="float-right flex">
      <button class="question-btn btn-blue" @click="answerTrue">정답</button>
      <button class="question-btn btn-red" @click="answerFalse">오답</button>
      <button class="question-btn" @click="emtis('btn:pre')">이전</button>
      <button class="question-btn" @click="emtis('btn:next')">다음</button>
    </div>
    <LazyButtonAccordionButton class="my-[.5rem]">
      <template #button>
        <span class="block">정답 보기</span>
      </template>
      <p v-html="item['답'] || '<div>답 없음</div>'"></p>
    </LazyButtonAccordionButton>

    <LazyButtonAccordionButton class="my-[.5rem]">
      <template #button>
        <span class="block">해설 보기</span>
      </template>
      <p v-html="item['해설'] || '<div>해설 없음</div>'"></p>
    </LazyButtonAccordionButton>
  </div>
</template>

<style lang="scss">
.wrap {
  border: 1px solid black;
  margin: 0.5rem 0;

  @apply px-[.5rem];
}
.question-btn {
  @apply text-white font-bold py-2 px-4 rounded bg-stone-500 hover:bg-stone-700 border-transparent;
  @apply cursor-pointer m-[.2rem];

  &.btn-red {
    @apply bg-blue-500 hover:bg-blue-700;
  }
  &.btn-blue {
    @apply bg-red-500 hover:bg-red-700;
  }
}

img {
  @apply w-full object-contain;
}
</style>
