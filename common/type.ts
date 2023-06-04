export interface ItemProperty {
  index: any;
  score: number;
  질문: string;
  보기: string;
  보기src: string;
  답: string;
  해설: string;
  제출란: string;
}

export interface CoreOutPut {
  sucess: boolean;
  desc?: string;
  err?: string;
}
