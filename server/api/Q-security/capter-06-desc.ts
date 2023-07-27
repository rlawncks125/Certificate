//정보보안관리/법규-서술형

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690416988/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88%EA%B4%80%EB%A6%AC-%EB%B2%95%EA%B7%9C-%EC%84%9C%EC%88%A0%ED%98%95_l3w6xd.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
