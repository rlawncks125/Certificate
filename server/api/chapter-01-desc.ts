//@ts-ignore
import data from "../datas/시스템보안-서술형.json" assert { type: "json" };

// 시스템 보안-서술형
export default defineEventHandler(async () => {
  return data;
});
