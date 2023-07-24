//@ts-ignore
// import data from "../datas/어플리케이션-실무형.json" assert { type: "json" };

import { PREPARING_QUESTION_PATH } from "../../common/path";

export default defineEventHandler(async () => {
  const res = await fetch(PREPARING_QUESTION_PATH)
    .then((res) => res.json())
    .catch((err) => {});

  return res;

  // return data;
});
