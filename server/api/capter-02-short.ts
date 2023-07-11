//@ts-ignore
// import data from "../datas/네트워크보안-단답형.json" assert { type: "json" };

// 네트워크 보안-단답형
export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1689110296/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EB%B3%B4%EC%95%88-%EB%8B%A8%EB%8B%B5%ED%98%95_doeoro.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;

  // return data || {};
});
