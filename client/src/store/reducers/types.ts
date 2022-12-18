export type rankState = {
  rank: number | null;
  isLoading: boolean;
  error: any;
};

export type Word = {
  id: number;
  word: string;
  pos: string;
};

export type WordsState = {
  words: Word[] | null;
  isLoading: boolean;
  error: any;
};
export type wordsPayload = {
  data?: Word[];
  message?: string;
};
export type rankPayload = {
  rank?: number;
  message?: string;
};
