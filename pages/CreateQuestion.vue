<script setup lang="ts">
import Editor from "@toast-ui/editor";
import { ItemProperty } from "~/common/type";

const 질문Ref = ref();
const 보기Ref = ref();
const 답Ref = ref();
const 해설Ref = ref();

const toastEditor = reactive({
  질문: "",
  보기: "",
  답: "",
  해설: "",
} as any);

const onParser = () => {
  const item = {
    질문: onGetHTML(toastEditor["질문"]).substring(
      3,
      onGetHTML(toastEditor["질문"]).length - 4
    ),
    보기: onGetHTML(toastEditor["보기"]),
    보기src: "",
    답: onGetHTML(toastEditor["답"]),
    해설: onGetHTML(toastEditor["해설"]),
    제출란: "",
  } as ItemProperty;

  // 클립 복사
  navigator.clipboard
    .writeText(JSON.stringify(item))
    .then(() => {
      console.log("클립복사 성공", JSON.stringify(item));
    })
    .catch(() => {
      console.log("클립복사 실패");
    });
  console.log(item);
};

const onGetHTML = (editor: Editor): string => {
  if (editor.getHTML() === "<p><br></p>") return "";

  const html = editor.getHTML().replaceAll('"', "'");

  return html + "";
};

onMounted(() => {
  const { $setToastEditor } = useNuxtApp();

  // editor.value = $setToastEditor(toastUIRef.value);
  toastEditor["질문"] = $setToastEditor(질문Ref.value);
  toastEditor["보기"] = $setToastEditor(보기Ref.value);
  toastEditor["답"] = $setToastEditor(답Ref.value);
  toastEditor["해설"] = $setToastEditor(해설Ref.value, "400px");
});
</script>

<template>
  <div>
    <span> createQuestion </span>
    <NuxtLink to="/">홈으로</NuxtLink>
  </div>
  <br />
  <button
    @click="onParser"
    class="p-4 border text-white bg-black hover:opacity-70"
  >
    getJSON
  </button>
  <h1>질문</h1>
  <div ref="질문Ref"></div>
  <h1>보기</h1>
  <div ref="보기Ref"></div>
  <h1>답</h1>
  <div ref="답Ref"></div>
  <h1>해설</h1>
  <div ref="해설Ref"></div>
</template>

<style lang="scss">
h1 {
  @apply text-[2rem];
}

// toast ui color 배치가 이상해서 직접 지정
.tui-colorpicker-clearfix {
  display: flex;
  flex-wrap: wrap;
}

.tui-colorpicker-slider-container {
  display: flex !important;
  gap: 5px;
}
</style>
