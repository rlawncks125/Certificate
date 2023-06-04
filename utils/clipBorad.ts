export const clipBord = (text: string) => {
  const { success, fail } = useAlert();
  // 클립 복사
  navigator.clipboard
    .writeText(text)
    .then(() => {
      success("클립복사 성공");
    })
    .catch(() => {
      fail("복사 실패");
    });
};

export default clipBord;
