import { freshStat } from '../components/Game/data';

export default function updateHistory(
  gameData: Game | undefined,
  gamedayId: string
): Stat[] | undefined {
  if (!gameData || !gamedayId) return;
  const storageString = localStorage.getItem('userStats');
  const stat = freshStat(gamedayId);
  let history: Stat[] = [];
  if (!storageString) {
    history.push(stat);
    localStorage.setItem('userStats', JSON.stringify(history));
  } else if (!isGameInHistory(JSON.parse(storageString), gamedayId)) {
    history = JSON.parse(storageString);
    history.push(stat);
    localStorage.setItem('userStats', JSON.stringify(history));
  } else {
    history = JSON.parse(storageString);
  }

  return history;
}

const isGameInHistory = (history: Stat[], gameId: string): boolean => {
  const idx = history.findIndex((stat: Stat) => stat.id === gameId);
  return idx !== -1;
};
