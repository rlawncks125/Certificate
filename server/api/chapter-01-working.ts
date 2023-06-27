//@ts-ignore
import data from "../datas/시스템보안-실무형.json" assert { type: "json" };

export default defineEventHandler(async () => {
  // const res = await fetch(
  //   "https://res.cloudinary.com/dhdq4v4ar/raw/upload/v1685432406/%EC%A0%95%EB%B3%B4%EB%B3%B4%EC%95%88/%EC%8B%9C%EC%8A%A4%ED%85%9C%EB%B3%B4%EC%95%88-%EB%8B%A8%EB%8B%B5%ED%98%95_vshjsl.json"
  // ).then((res) => res.json());

  // return res;

  return data;
});
