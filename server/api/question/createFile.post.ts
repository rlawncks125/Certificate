import * as fs from "fs";
import { QUESTION_DIRECTORY_PATH } from "../../../common/path";
import { CoreOutPut } from "../../../common/type";

export interface CreateFileInputDTO {
  fileName: string;
}

// 네트워크 보안-단답형
export default defineEventHandler(async (event) => {
  const { fileName } = (await readBody(event)) as CreateFileInputDTO;

  // 파일 경로와 내용
  const filePath = `${QUESTION_DIRECTORY_PATH}/${fileName}`;
  const content = `"":{"질문":"","보기":"","보기src":"","답":"","해설":"","제출란":""}`;
  const fileContent = "{\n" + content + "\n}";

  return findDirectory()
    .then(() => createFile(filePath, fileContent))
    .catch((err) => {
      return {
        sucess: false,
        err,
      } as CoreOutPut;
    });
});

const findDirectory = () => {
  return new Promise((res, rej) => {
    fs.stat(QUESTION_DIRECTORY_PATH, (err, stats) => {
      if (err) {
        if (err.code === "ENOENT") {
          // 디렉터리가 없는 경우 생성
          fs.mkdir(QUESTION_DIRECTORY_PATH, { recursive: true }, (err) => {
            if (err) {
              console.error("Error:", err);
              rej(err);
            } else {
              console.log("디렉터리 생성해 성공함.");

              res(true);
            }
          });
        } else {
          console.error("Error:", err);
        }
      } else if (stats.isDirectory()) {
        console.log("디렉터리가 이미존재함.");

        res(true);
      } else {
        console.error("Error: Path is not a directory.");
        rej(err);
      }
    });
  });
};

function checkedFile(filePath: string) {
  return new Promise((res, rej) => {
    // 파일 읽기
    fs.readFile(filePath, "utf8", (err, data) => {
      data ? res(false) : res(true);
      err && rej(err);
    });
  });
}

async function createFile(
  filePath: string,
  content: string
): Promise<CoreOutPut> {
  const isCreate = await checkedFile(filePath);
  return new Promise((res, rej) => {
    if (isCreate) {
      // 파일 생성
      fs.writeFile(filePath, content, (err: any) => {
        if (err) {
          console.error("Error:", err);

          rej(err);
        } else {
          console.log("File created successfully.");
          res({
            sucess: true,
            desc: "파일 생성을 성공함",
          });
        }
      });
    } else {
      console.log("이미 파일이 존재함");

      rej("이미 파일이 존재함");
    }
  });
}
