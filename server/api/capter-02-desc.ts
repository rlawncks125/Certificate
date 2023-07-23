//@ts-ignore
// import data from "../datas/네트워크보안-서술형.json" assert { type: "json" };

// 네트워크 보안-서술형
export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690152417/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EB%B3%B4%EC%95%88-%EC%84%9C%EC%88%A0%ED%98%95_pzdx6m.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;

  // return data || {};
});
