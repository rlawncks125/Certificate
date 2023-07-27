//정보보안관리/법규-실무형

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690416991/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88%EA%B4%80%EB%A6%AC-%EB%B2%95%EA%B7%9C-%EC%8B%A4%EB%AC%B4%ED%98%95_p1eqcd.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
