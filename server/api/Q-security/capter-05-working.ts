// 정보보안 일반-실무형

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690341788/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88%EC%9D%BC%EB%B0%98-%EC%8B%A4%EB%AC%B4%ED%98%95_uqlnya.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
