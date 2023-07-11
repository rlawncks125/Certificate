//@ts-ignore
// import data from "../datas/other-01.json" assert { type: "json" };

// 기타문제
export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1689110277/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/other-01_udwwxg.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;

  // return data;
});
