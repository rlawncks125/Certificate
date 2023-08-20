//@ts-ignore

export default defineEventHandler(async () => {
  const res = await fetch(
    "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1692533644/%EC%A7%81%EB%AC%B4%EB%A9%B4%EC%A0%91_sc1t20.json"
  )
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
