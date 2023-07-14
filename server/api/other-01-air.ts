//@ts-ignore
// import data from "../datas/other-01.json" assert { type: "json" };

// 설비보존 공압 문제
export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1689336478/%EA%B8%B0%ED%83%80%20%EC%9E%90%EA%B2%A9%EC%A6%9D/%EC%84%A4%EB%B9%84%EB%B3%B4%EC%A0%84%EA%B8%B0%EC%82%AC-%EA%B3%B5%EC%95%95_qud3ai.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;

  // return data;
});
