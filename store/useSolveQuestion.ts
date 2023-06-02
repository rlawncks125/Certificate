import { defineStore } from "pinia";
import { list } from "postcss";
import { ItemProperty } from "~/common/type";
import { QuestionTypeShortPram } from "~/composables/useQuestion";

export interface SolveQuestion {
  item: ItemProperty;
  isAnswer: boolean | null;
}

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
}

export const useSolveQuestion = defineStore(
  "solveQuestion",
  () => {
    const {
      questionTypeDescriptive,
      questionTypeShortAnswer,
      questionTypeWorking,
    } = useQuestion();

    const lists = useState<SolveQuestion[]>("solve-question", () => []);
    const solveIndex = useState<number>("solveIndex", () => 0);

    const batch = (단답: number, 서술형: number, 실무형: number) => {
      const arr1 = shuffle([]).splice(0, 단답);
      const arr2 = shuffle([]).splice(0, 서술형);
      const arr3 = shuffle([]).splice(0, 실무형);

      lists.value = [...arr1, ...arr2, ...arr3];
    };

    const update = (index: number, item: SolveQuestion) => {
      console.log(index, item);
      // 문제를 배치한다음
      // 인덱스로 문제를 풀면서 업데이트 식으로 하면될듯
      lists.value[index] = item;
    };

    const reset = () => {
      lists.value = [];
    };

    const batchTest = async (options: batchParms) => {
      lists.value = [];
      const fetchLists = [];
      if (options.short) {
        const shortLists = questionTypeShortAnswer(
          options.short.types,
          true
        ).then((res) => shuffle(res).splice(0, options.short?.count));
        fetchLists.push(shortLists);
      }

      const questionLists = (await Promise.all(fetchLists)).flat(2);
      console.log(questionLists);
      lists.value = questionLists;
      solveIndex.value = 0;
      return questionLists;
    };
    return { lists, solveIndex, reset, batchTest, update };
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
