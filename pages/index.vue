<script setup lang="ts">
const chapter1 = await useFetch("/api/chapter-01-short");
const questionLists = useState<any[]>("문제 배열", () => []);

onMounted(() => {
  if (!chapter1.data.value) return;
  const questtion: { [key: string]: any } = toRaw(chapter1.data.value);

  // console.log(questtion);
  const part1 = Object.keys(questtion).map((key) => {
    const item = questtion[key];

    // if ("해설" in item) {
    //   // '하이라이트'
    //   item["해설"] = highlightText(item["해설"]);
    // }
    item["index"] = key;
    return item;
  });

  questionLists.value.push(...part1);
});

/** '로 묶은 단어 강조 '하이라이트 텍스트' */
const highlightText = (text: string) => {
  return text.replace(/\'(.*?)\'/g, "<span class='text-red-500'>$1</span>");
};
</script>

<template>
  <div>
    <span> Home </span>
    <NuxtLink to="/CreateQuestion">문제 생성</NuxtLink>
  </div>

  <div v-if="questionLists" v-for="item in questionLists">
    <Question :item="item" />
  </div>
</template>

<style lang="scss">
body {
  @apply px-[1rem];

  white-space: pre-wrap;
}

table {
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #444444;
  padding: 10px;
}
</style>
