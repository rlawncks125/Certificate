<script setup lang="ts">
import Editor from "@toast-ui/editor";
import { ItemProperty } from "~/common/type";

import { storeToRefs } from "pinia";
import useWriteQuestion from "~/store/useWriteQuestion";

const router = useRouter();

const { 답txt, 보기txt, 질문txt, 해설txt } = storeToRefs(useWriteQuestion());
const { save: storeSave, init: storeInit } = useWriteQuestion();

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

  const jsonData = JSON.stringify(item);
  // 클립 복사
  navigator.clipboard
    .writeText(jsonData)
    .then(() => {
      const { $toastAlertSuccess } = useNuxtApp();
      console.log("클립복사 성공", jsonData);
      $toastAlertSuccess("클립복사 성공");
    })
    .catch(() => {
      console.log("클립복사 실패");
    });
  console.log(item);

  storeSave(item);
};

const onGetHTML = (editor: Editor): string => {
  if (editor.getHTML() === "<p><br></p>") return "";

  const html = editor.getHTML().replaceAll('"', "'");

  return html + "";
};

const initStore = () => {
  storeInit();
  router.go(0);
};

onMounted(() => {
  const { $setToastEditorSetHTML } = useNuxtApp();

  // editor.value = $setToastEditor(toastUIRef.value);

  toastEditor["질문"] = $setToastEditorSetHTML(질문Ref.value, 질문txt.value);
  toastEditor["보기"] = $setToastEditorSetHTML(보기Ref.value, 보기txt.value);
  toastEditor["답"] = $setToastEditorSetHTML(답Ref.value, 답txt.value);
  toastEditor["해설"] = $setToastEditorSetHTML(
    해설Ref.value,
    해설txt.value,
    "400px"
  );
});
</script>

<template>
  <div>
    <span> createQuestion </span>
    <NuxtLink to="/">홈으로</NuxtLink>
  </div>
  <div @click="initStore" class="float-right">
    <button>데이터 초기화</button>
  </div>
  <br />

  <h1>질문</h1>
  <div ref="질문Ref"></div>
  <h1>보기</h1>
  <div ref="보기Ref"></div>
  <h1>답</h1>
  <div ref="답Ref"></div>
  <h1>해설</h1>
  <div ref="해설Ref"></div>
  <button
    @click="onParser"
    class="p-4 border text-white bg-black hover:opacity-70 float-right my-2 cursor-pointer"
  >
    getJSON
  </button>
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
