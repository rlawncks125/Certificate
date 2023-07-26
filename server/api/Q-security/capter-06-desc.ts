//정보보안관리/법규-서술형
//@ts-ignore
// import data from "../../datas/정보보안관리-법규-서술형.json" assert { type: "json" };

import { PREPARING_QUESTION_PATH } from "../../../common/path";

export default defineEventHandler(async () => {
  // return data;
  const res = await fetch(PREPARING_QUESTION_PATH)
    .then((res) => res.json())
    .catch((err) => {});

  return res;
});
