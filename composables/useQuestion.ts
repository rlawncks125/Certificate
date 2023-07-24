import { SolveQuestion } from "@/common/type";
import { QuestionProperty } from "~/common/type";

export type QuestionTypeShortPram =
  | "시스템보안"
  | "네트워크보안"
  | "어플리케이션보안";
export type QuestionTypeOther = "설비보전-공압" | "설비보전-유압";

export const useQuestion = () => {
  /** 단단형 */
  async function questionTypeShortAnswer(
    questionTypes: QuestionTypeShortPram[],
    isSolveType = false
  ) {
    const fetchLists: any[] = [];
    const score = 3;

    const questionMaps: { [key in QuestionTypeShortPram]: any } = {
      시스템보안: "/api/chapter-01-short",
      네트워크보안: "/api/capter-02-short",
      어플리케이션보안: "/api/capter-03-short",
    };

    questionTypes.forEach((v) => {
      if (v in questionMaps) {
        fetchLists.push(
          useFetch(questionMaps[v]).then((res) => res.data.value)
        );
      }
    });

    // console.log(questionTypes);
    // const 시스템보안단답 = useFetch("/api/chapter-01-short").then(
    //   (res) => res.data.value
    // );
    // fetchLists.push(시스템보안단답);
    // const 보안쪽 = useFetch("/api/chapter-01-short").then(
    //   (res) => res.data.value
    // );
    // fetchLists.push(보안쪽);

    const questionLists = await Promise.all(fetchLists);

    return questionLists
      .map((v) =>
        isSolveType ? solveDataParser(v, score) : fetchDataParser(v)
      )
      .flat(2);
  }

  /** 서술형 */
  async function questionTypeDescriptive(
    questionTypes: QuestionTypeShortPram[],
    isSolveType = false
  ) {
    const fetchLists: any[] = [];
    const score = 12;

    const questionMaps: { [key in QuestionTypeShortPram]: any } = {
      시스템보안: "/api/chapter-01-desc",
      네트워크보안: "/api/capter-02-desc",
      어플리케이션보안: "/api/capter-03-desc",
    };

    questionTypes.forEach((v) => {
      if (v in questionMaps) {
        fetchLists.push(
          useFetch(questionMaps[v]).then((res) => res.data.value)
        );
      }
    });

    const questionLists = await Promise.all(fetchLists);

    return questionLists
      .map((v) =>
        isSolveType ? solveDataParser(v, score) : fetchDataParser(v)
      )
      .flat(2);
  }
  /** 실무형 */
  async function questionTypeWorking(
    questionTypes: QuestionTypeShortPram[],
    isSolveType = false
  ) {
    const fetchLists: any[] = [];
    const score = 16;

    const questionMaps: { [key in QuestionTypeShortPram]: any } = {
      시스템보안: "/api/chapter-01-working",
      네트워크보안: "/api/capter-02-working",
      어플리케이션보안: "/api/capter-03-working",
    };

    questionTypes.forEach((v) => {
      if (v in questionMaps) {
        fetchLists.push(
          useFetch(questionMaps[v]).then((res) => res.data.value)
        );
      }
    });

    const questionLists = await Promise.all(fetchLists);

    return questionLists
      .map((v) =>
        isSolveType ? solveDataParser(v, score) : fetchDataParser(v)
      )
      .flat(2);
  }
  /** 기타 문제 */
  async function questionTypeOther(
    questionTypes: QuestionTypeOther[],
    isSolveType = false
  ) {
    const fetchLists: any[] = [];
    const score = 20;

    const questionMaps: { [key in QuestionTypeOther]: any } = {
      "설비보전-공압": "api/other-01-air",
      "설비보전-유압": "api/other-01-oil",
    };

    questionTypes.forEach((v) => {
      if (v in questionMaps) {
        fetchLists.push(
          useFetch(questionMaps[v]).then((res) => res.data.value)
        );
      }
    });

    const questionLists = await Promise.all(fetchLists);

    return questionLists
      .map((v) =>
        isSolveType ? solveDataParser(v, score) : fetchDataParser(v)
      )
      .flat(2);
  }

  const getQuestionsSelect = async ({
    short,
    desc,
    working,
    other,
  }: {
    short?: QuestionTypeShortPram[];
    desc?: QuestionTypeShortPram[];
    working?: QuestionTypeShortPram[];
    other?: QuestionTypeOther[];
  }) => {
    const getLists = [];

    if (short) {
      getLists.push(questionTypeShortAnswer(short));
    }
    if (desc) {
      getLists.push(questionTypeDescriptive(desc));
    }
    if (working) {
      getLists.push(questionTypeWorking(working));
    }
    if (other) {
      getLists.push(questionTypeOther(other));
    }

    const questionLists = (await Promise.all(getLists)).flat(2);

    return questionLists;
  };

  const getAllQuestion = async () => {
    const short = questionTypeShortAnswer(["시스템보안", "네트워크보안"]);
    const desc = questionTypeDescriptive(["시스템보안"]);
    const working = questionTypeWorking(["시스템보안"]);

    const questionLists = (await Promise.all([short, desc, working])).flat(2);

    return questionLists;
  };

  return {
    questionTypeShortAnswer,
    questionTypeDescriptive,
    questionTypeWorking,
    questionTypeOther,
    getAllQuestion,
    getQuestionsSelect,
  };
};

export default useQuestion;

function solveDataParser(data: any, score: number) {
  if (!data) return;
  const questtion: { [key: string]: any } = toRaw(data);

  const part1 = Object.keys(questtion).map((key): SolveQuestion => {
    const item = questtion[key];

    item["index"] = key;
    return { item, isAnswer: null, score, real: +key };
  });

  return [...part1];
}

function fetchDataParser(data: any) {
  if (!data) return;
  const questtion: { [key: string]: any } = toRaw(data);

  const part1 = Object.keys(questtion).map((key): QuestionProperty => {
    const item = questtion[key];

    item["index"] = key;
    return item;
  });

  return [...part1];
}
