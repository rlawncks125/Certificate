import { defineStore } from "pinia";

type questionTypes = "서술형1" | "서술형2" | "실무";

export const useQuestionLists = defineStore(
  "custom-questionLists",
  () => {
    const { getQuestionsSelect } = useQuestion();

    const questionLists = useState<any[]>("get-questionLists", () => []);

    const questionsMaps = {
      서술형1: [
        519, 661, 821, 494, 517, 650, 816, 318, 492, 319, 347, 493, 336, 111,
        328, 812, 348, 104,
      ],
      서술형2: [],
      실무: [],
    } as { [key in questionTypes]: number[] };

    const filterQuestionByNumbers = (questions: any[], numbers: number[]) => {
      questionLists.value = questions.flat(2);
      questionLists.value = questionLists.value.filter((v: any) =>
        numbers.includes(+v.index)
      );
      console.log(questionLists.value);

      questionLists.value.sort((a, b) => b.index - a.index);
    };

    const getDescQuestions = (numbers: number[]) => {
      getQuestionsSelect({
        desc: [
          "네트워크보안",
          "시스템보안",
          "어플리케이션보안",
          "정보보안 괸리/법규",
          "정보보안 일반",
          "침해사고 분석 및 대응",
        ],
      }).then((res) => {
        filterQuestionByNumbers(res, numbers);
      });
    };

    const getWorkingQuestions = (numbers: number[]) => {
      getQuestionsSelect({
        working: [
          "네트워크보안",
          "시스템보안",
          "어플리케이션보안",
          "정보보안 괸리/법규",
          "정보보안 일반",
          "침해사고 분석 및 대응",
        ],
      }).then((res) => {
        filterQuestionByNumbers(res, numbers);
      });
    };

    const getQuestion = (type: questionTypes) => {
      switch (type) {
        case "서술형1":
          getDescQuestions(questionsMaps[type]);
          break;
        case "서술형2":
          getDescQuestions(questionsMaps[type]);
          break;
        case "실무":
          getWorkingQuestions(questionsMaps[type]);
          break;
        default:
          break;
      }
    };

    const reset = () => {
      questionLists.value = [];
    };

    return {
      questionLists,
      getQuestion,
      reset,
    };
  },
  {
    persist: {
      paths: ["questionLists"],
      storage: persistedState.localStorage,
    },
  }
);

export default useQuestionLists;

// getQuestionsSelect({
//   // short: ["정보보안 괸리/법규"],
//   desc: [
//     "네트워크보안",
//     "시스템보안",
//     "어플리케이션보안",
//     "정보보안 괸리/법규",
//     "정보보안 일반",
//     "침해사고 분석 및 대응",
//   ],
//   // working: ["정보보안 괸리/법규"],
//   // other: ["직무면접"],
// }).then((res) => {
//   // const selectedNumbers = [729];
//   const selectedNumbers = [
//     519, 661, 821, 494, 517, 650, 816, 318, 492, 319, 347, 493, 336, 111,
//     328, 812, 348, 104,
//   ];

//   questionLists.value = res.flat(2);

//   questionLists.value = questionLists.value.filter((v: any) =>
//     selectedNumbers.includes(+v.index)
//   );
//   console.log(questionLists.value);

//   questionLists.value.sort((a, b) => b.index - a.index);
// });
