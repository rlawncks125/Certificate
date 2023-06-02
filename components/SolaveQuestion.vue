<script setup lang="ts">
import { ItemProperty } from "~/common/type";
import useSolveQuestion, { type SolveQuestion } from "~/store/useSolveQuestion";

const { item, itemIndex } = defineProps<{
  item: ItemProperty;
  itemIndex?: number;
}>();

const emtis = defineEmits<{
  (e: "update:next", item: SolveQuestion): void;
  (e: "btn:next"): void;
  (e: "btn:pre"): void;
}>();

const answer = ref(item["제출란"] || "");
const textareaRef = ref();

const textareaAutoHieght = (e: any) => {
  const textarea = e.target as HTMLTextAreaElement;

  textarea.style.height = "auto";
  const scrollHeight = textarea.scrollHeight + 4;
  textarea.style.height = scrollHeight + "px";
};

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
        @input="textareaAutoHieght"
        v-model="answer"
      >
      </textarea>
    </div>
    <div class="float-right flex">
      <button class="question-btn" @click="answerTrue">정답</button>
      <button class="question-btn" @click="answerFalse">오답</button>
      <button class="question-btn" @click="emtis('btn:pre')">이전</button>
      <button class="question-btn" @click="emtis('btn:next')">다음</button>
    </div>
    <AccordionButton class="my-[.5rem]">
      <template #button>
        <span class="block">정답 보기</span>
      </template>
      <p v-html="item['답'] || '<div>답 없음</div>'"></p>
    </AccordionButton>

    <AccordionButton class="my-[.5rem]">
      <template #button>
        <span class="block">해설 보기</span>
      </template>
      <p v-html="item['해설'] || '<div>해설 없음</div>'"></p>
    </AccordionButton>
  </div>
</template>

<style lang="scss">
.wrap {
  border: 1px solid black;
  margin: 0.5rem 0;

  @apply px-[.5rem];
}
.question-btn {
  @apply cursor-pointer m-[.2rem];
}
</style>
