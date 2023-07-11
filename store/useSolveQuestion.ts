import { defineStore } from "pinia";
import { list } from "postcss";
import { QuestionProperty, SolveQuestion } from "~/common/type";
import {
  QuestionTypeShortPram,
  QuestionTypeOther,
} from "~/composables/useQuestion";

interface batchParms {
  short?: {
    types: QuestionTypeShortPram[];
    count: number;
  };
  descriptive?: {
    types: QuestionTypeShortPram[];
    count: number;
  };
  working?: {
    types: QuestionTypeShortPram[];
    count: number;
  };
  other?: {
    types: QuestionTypeOther[];
    count: number;
  };
}

export const useSolveQuestion = defineStore(
  "solveQuestion",
  () => {
    const {
      questionTypeDescriptive,
      questionTypeShortAnswer,
      questionTypeWorking,
      questionTypeOther,
    } = useQuestion();

    const lists = useState<SolveQuestion[]>("solve-question", () => []);
    const solveIndex = useState<number>("solveIndex", () => 0);

    const update = (index: number, item: SolveQuestion) => {
      console.log(index, item);
      // 문제를 배치한다음
      // 인덱스로 문제를 풀면서 업데이트 식으로 하면될듯
      lists.value[index] = { ...lists.value[index], ...item };
    };

    const reset = () => {
      lists.value = [];
    };

    const batch = async (options: batchParms) => {
      lists.value = [];
      const fetchLists = [];

      if (options.short) {
        const shortLists = questionTypeShortAnswer(
          options.short.types,
          true
        ).then((res) => shuffle(res).splice(0, options.short?.count));
        fetchLists.push(shortLists);
      }
      if (options.descriptive) {
        const descLists = questionTypeDescriptive(
          options.descriptive.types,
          true
        ).then((res) => shuffle(res).splice(0, options.descriptive?.count));
        fetchLists.push(descLists);
      }
      if (options.working) {
        const workLists = questionTypeWorking(options.working.types, true).then(
          (res) => shuffle(res).splice(0, options.working?.count)
        );
        fetchLists.push(workLists);
      }
      if (options.other) {
        const otherLists = questionTypeOther(options.other.types, true).then(
          (res) => shuffle(res).splice(0, options.other?.count)
        );
        fetchLists.push(otherLists);
      }

      const questionLists = (await Promise.all(fetchLists)).flat(2);
      console.log(questionLists);
      lists.value = questionLists;
      solveIndex.value = 0;
      return questionLists;
    };
    return { lists, solveIndex, reset, batch, update };
  },
  {
    persist: {
      paths: ["lists"],
      // 기본 값이 쿠기에저장인데 쿠기는 많은 데이터를 저장하지못함
      storage: persistedState.localStorage,
    },
  }
);

export default useSolveQuestion;

function shuffle(array: any[]) {
  return array.sort(() => Math.random() - 0.5);
}
