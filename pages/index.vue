<script setup lang="ts">
const chapter1 = await useFetch("/api/chapter-01-short");
const questionLists = useState<any[]>("문제 배열", () => []);

onMounted(() => {
  const questtion = toRaw(chapter1.data.value);

  console.log(questtion);
  questionLists.value = Object.keys(questtion).map((i) => {
    const item = questtion[i];
    if ("해설" in item) {
      // '하이라이트'
      item["해설"] = highlightText(item["해설"]);
    }
    item["index"] = i;
    return item;
  });
});

/** '로 묶은 단어 강조 '하이라이트 텍스트' */
const highlightText = (text: string) => {
  return text.replace(/\'(.*?)\'/g, "<span class='text-blue-500'>$1</span>");
};
</script>

<template>
  <div>Home</div>

  <div v-if="questionLists" v-for="item in questionLists">
    <Question :item="item" />
  </div>
</template>

<style lang="scss">
body {
  @apply px-[1rem];

  white-space: pre-wrap;
}
</style>
