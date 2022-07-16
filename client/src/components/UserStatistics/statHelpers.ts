import { consecDateStrings } from '../../helpers/dateHelpers';

export const todayIsDone = (finHistory: Stat[], gamedayId: string): boolean => {
  if (!finHistory) return false;
  return finHistory.some((stat) => stat.id === gamedayId);
};

export const numWon = (history: Stat[] | undefined): number => {
  if (!history) return 0;
  return history.reduce(
    (prev: number, cur: Stat): number =>
      cur.guessList.some((guess) => guess.isCorrect) ? prev + 1 : prev,
    0
  );
};

export const getMaxStreak = (history: Stat[]): number => {
  if (history.length === 0) return 0;

  const gamesInHistory = history
    .map((stat: Stat) => {
      return {
        id: stat.id,
        winningGuessIdx: stat.guessList.some((guess) => guess.isCorrect)
          ? stat.guessList.findIndex((guess) => guess.isCorrect)
          : undefined,
      };
    })
    .sort((a: any, b: any) => (Number(a.id) > Number(b.id) ? 1 : -1));

  if (gamesInHistory.length === 0) return 0;

  const dateCheckArr = consecDateStrings(gamesInHistory[0].id);

  const counts: number[] = [];
  let currentCount: number = 0;

  dateCheckArr.forEach((date) => {
    const histIdx = gamesInHistory.findIndex((game) => {
      return game.id === date;
    });

    if (histIdx === -1) {
      // was not attempted / did not finish
      if (currentCount !== 0) {
        counts.push(currentCount);
        currentCount = 0;
      }
    } else if (gamesInHistory[histIdx].winningGuessIdx !== undefined) {
      // was attempted and WON
      currentCount = currentCount + 1;
    } else {
      // was attempted and LOST
      if (currentCount !== 0) {
        counts.push(currentCount);
        currentCount = 0;
      }
    }
  });
  counts.push(currentCount);

  const maxCount = counts.reduce((prev, cur) => (cur > prev ? cur : prev), 0);

  return counts.length ? maxCount : 0;
};

export const getCurrentStreak = (
  history: Stat[] | undefined,
  gamedayId: string | undefined
): number => {
  if (!history || !gamedayId) return 0;

  const gamesInHist = history
    .map((stat: Stat) => {
      return {
        id: stat.id,
        winningGuessIdx: stat.guessList.some((guess) => guess.isCorrect)
          ? stat.guessList.findIndex((guess) => guess.isCorrect)
          : undefined,
      };
    })
    .sort((a: any, b: any) => (Number(a.id) < Number(b.id) ? 1 : -1));

  if (gamesInHist.length === 0) return 0;

  let dateCheckArr = consecDateStrings(
    gamesInHist[gamesInHist.length - 1].id
  ).reverse();
  const idx = dateCheckArr.indexOf(gamedayId);
  dateCheckArr = dateCheckArr.slice(idx);

  let count = 0;
  let i = 0;
  let current = true;
  while (i < dateCheckArr.length && current) {
    if (gamesInHist[i].id !== dateCheckArr[i]) {
      current = false;
      break;
    }
    if (gamesInHist[i].winningGuessIdx !== undefined) count += 1;
    else current = false;
    i++;
  }

  return count;
};

export const getScoreDistribution = (history: Stat[] | undefined) => {
  const distObj: { [index: string]: number } = {
    lose: 0,
    '1': 0,
    '2': 0,
    '3': 0,
  };
  if (!history) return distObj;

  const gamesInHist = history.map((stat: Stat) => {
    return {
      id: stat.id,
      winningGuessIdx: stat.guessList.some((guess) => guess.isCorrect)
        ? stat.guessList.findIndex((guess) => guess.isCorrect)
        : undefined,
    };
  });

  gamesInHist.forEach(
    (game: { id: string; winningGuessIdx: number | undefined }) => {
      if (game.winningGuessIdx === undefined) {
        distObj.lose++;
      } else {
        distObj[game.winningGuessIdx + 1]++;
      }
    }
  );

  return distObj;
};
