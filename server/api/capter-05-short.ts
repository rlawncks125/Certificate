// 정보보안일반-단답형
//@ts-ignore

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690341789/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88%EC%9D%BC%EB%B0%98-%EB%8B%A8%EB%8B%B5%ED%98%95_l2b18b.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
