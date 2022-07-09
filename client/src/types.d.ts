interface Stat {
  id: string;
  guessList: any[];
  hasFinished: boolean;
}

interface Game {
  ID: string;
  answer: string;
  works: {
    title: string;
    url: string;
    startTime: number;
    duration: number;
  }[];
}
