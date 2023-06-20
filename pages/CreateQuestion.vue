<script setup lang="ts">
import Editor from "@toast-ui/editor";
import { CoreOutPut, ItemProperty } from "~/common/type";

import { storeToRefs } from "pinia";
import useWriteQuestion from "~/store/useWriteQuestion";
import { CreateFileInputDTO } from "~/server/api/question/createFile.post";
import { AppendFileInputDTO } from "~/server/api/question/appendFile.post";
import { EVENTS } from "vue-toastification/dist/types/ts/constants";

const router = useRouter();

const { 답txt, 보기txt, 질문txt, 해설txt } = storeToRefs(useWriteQuestion());
const { save: storeSave, init: storeInit } = useWriteQuestion();

const 질문Ref = ref();
const 보기Ref = ref();
const 답Ref = ref();
const 해설Ref = ref();
const fileName = useCookie("create-file-name", { default: () => "" });

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

  // console.log(item);

  // 내용 붙이기
  useFetch("/api/question/appendFile", {
    method: "post",
    body: {
      fileName: fileName.value,
      content: jsonData,
    } as CreateFileInputDTO,
  }).then((succes) => {
    if (succes) {
      useAlert().base("추가했습니다.");
    }
  });

  storeSave(item);

  // clipBorad(jsonData);
};
const onCreateFile = () => {
  useFetch("/api/question/createFile", {
    method: "post",
    body: {
      fileName: fileName.value,
    } as AppendFileInputDTO,
  })
    .then((res: any) => {
      const { sucess, desc, err } = res.data.value as CoreOutPut;

      if (sucess) {
        useAlert().success(desc!);
      } else {
        useAlert().fail(err!);
      }
    })
    .catch((err) => {
      console.log("클라이언트 에러 핸들링", err);
    });
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

const onKeyDownSave = (ev: KeyboardEvent) => {
  if (ev.ctrlKey && (ev.key === "s" || ev.key === "S")) {
    ev.preventDefault();
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
    storeSave(item);
    useAlert().success("저장됨");
  }
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

  window.addEventListener("keydown", onKeyDownSave);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDownSave);
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
  <div>
    <div>
      <label for="file-name">파일 경로 </label>
      <input type="text" name="file-name" id="" v-model="fileName" />
    </div>
    <button @click="onCreateFile">파일 생성</button>
  </div>
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
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
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
