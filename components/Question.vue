<script setup lang="ts">
const { item } = defineProps<{ item: any }>();
</script>

<template>
  <div class="wrap">
    <div class="py-[.4rem]">
      <p>{{ item["index"] }}. {{ item["질문"] }}</p>
    </div>

    <div class="py-[.4rem]">
      <p v-html="item['보기']"></p>
      <p>{{ item["보기src"] }}</p>
    </div>

    <AccordionButton class="m-[.5rem]">
      <template #button>
        <span class="block">답 보기</span>
      </template>
      <p v-html="item['답'] || '<div>답 없음</div>'"></p>
    </AccordionButton>

    <AccordionButton class="m-[.5rem]">
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
</style>
