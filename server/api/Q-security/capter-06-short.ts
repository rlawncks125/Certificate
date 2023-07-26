//정보보안관리/법규-단답형

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690369143/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88%EA%B4%80%EB%A6%AC-%EB%B2%95%EA%B7%9C-%EB%8B%A8%EB%8B%B5%ED%98%95_pzt2dq.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
