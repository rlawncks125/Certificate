// 정보보안일반-서술형

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1690341788/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88%EC%9D%BC%EB%B0%98-%EC%84%9C%EC%88%A0%ED%98%95_mq90h4.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
