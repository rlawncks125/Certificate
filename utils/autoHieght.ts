export const textareaAutoHieghtByInputHandler = (e: any) => {
  const textarea = e.target as HTMLTextAreaElement;

  textarea.style.height = "auto";
  const scrollHeight = textarea.scrollHeight + 4;
  textarea.style.height = scrollHeight + "px";
};

export const textareaAutoHieghtByElement = (el: HTMLElement) => {
  el.style.height = "auto";
  const scrollHeight = el.scrollHeight + 4;
  el.style.height = scrollHeight + "px";
};
