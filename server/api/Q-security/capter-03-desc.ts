export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690251193/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98-%EC%84%9C%EC%88%A0%ED%98%95_prca4s.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
