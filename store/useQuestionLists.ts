import { defineStore } from "pinia";

type questionTypes = "서술형1" | "서술형2" | "실무형1" | "실무형2";

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
      실무형1: [
        142, 151, 147, 144, 366, 673, 685, 679, 379, 139, 688, 374, 678, 150,
        533, 680, 670, 380, 534, 158, 145, 714, 686, 528, 137, 372, 677, 146,
        138, 381, 149, 371, 363, 152, 375, 676, 163, 373, 156, 687, 523, 531,
        536, 130, 155, 675, 153, 524, 543, 370, 542, 695, 694, 539, 532, 535,
        140, 689, 541, 540, 691, 364, 538, 143, 537, 526, 365, 148, 671, 358,
        369, 359, 368, 360, 367,
      ],
      실무형2: [
        527, 157, 136, 141, 131, 135, 133, 378, 128, 682, 132, 154, 357, 123,
        529, 530, 164, 126, 361, 159, 692, 127, 162, 674, 693, 683, 681, 129,
        836, 690, 377, 160, 672, 362, 161, 716, 837, 684,
      ],
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
        case "서술형2":
          getDescQuestions(questionsMaps[type]);
          break;
        case "실무형1":
        case "실무형2":
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
