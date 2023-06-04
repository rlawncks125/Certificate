import * as fs from "fs";
import { QUESTION_DIRECTORY_PATH } from "../../../common/path";

export interface AppendFileInputDTO {
  fileName: string;
  content: string;
}

// 파일 경로와 추가할 내용
export default defineEventHandler(async (event) => {
  const { fileName, content } = (await readBody(event)) as AppendFileInputDTO;

  const filePath = `${QUESTION_DIRECTORY_PATH}/${fileName}`;
  const additionalContent = `"":${content}`;

  return new Promise((res, rej) => {
    // 파일 읽기
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error:", err);
      } else {
        // 파일 내용 수정
        const modifiedContent = data.replace(
          "}\n}",
          "}," + additionalContent + "\n}"
        );

        // 수정된 내용 파일에 쓰기
        fs.writeFile(filePath, modifiedContent, "utf8", (err) => {
          if (err) {
            console.error("Error:", err);
            rej(err);
          } else {
            console.log("File content modified successfully.");
            res(true);
          }
        });
      }
    });
  });

  function appendFile() {
    // 파일에 내용 추가
    fs.appendFile(filePath, additionalContent, (err) => {
      if (err) {
        console.error("Error:", err);
        return false;
      } else {
        console.log("Content appended successfully.");
        return true;
      }
    });
  }
});
