// 침해사고분석및대응-실무형

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690337567/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%B9%A8%ED%95%B4%EC%82%AC%EA%B3%A0%EB%B6%84%EC%84%9D%EB%B0%8F%EB%8C%80%EC%9D%91-%EC%8B%A4%EB%AC%B4%ED%98%95_nipweh.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
