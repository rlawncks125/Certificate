//@ts-ignore

// 기타문제
export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1689151790/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%84%A4%EB%B9%84%EB%B3%B4%EC%A0%84%EA%B8%B0%EC%82%AC-%EC%9C%A0%EC%95%95_xsh3kl.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
