import { defineStore } from "pinia";

export const useWriteQuestion = defineStore(
  "wirteQuestion",
  () => {
    const 질문txt = useState("질문toastEditor", () => "");
    const 보기txt = useState("보기toastEditor", () => "");
    const 답txt = useState("답toastEditor", () => "");
    const 해설txt = useState("해설toastEditor", () => "");

    const save = (item: any) => {
      답txt.value = item["답"];
      보기txt.value = item["보기"];
      질문txt.value = item["질문"];
      해설txt.value = item["해설"];
    };
    const init = () => {
      답txt.value = "";
      보기txt.value = "";
      질문txt.value = "";
      해설txt.value = "";
    };

    return {
      질문txt,
      보기txt,
      답txt,
      해설txt,
      save,
      init,
    };
  },
  {
    persist: {
      paths: ["질문txt", "보기txt", "답txt", "해설txt"],
    },
  }
);

export default useWriteQuestion;
