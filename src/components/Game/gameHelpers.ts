import { DateTime } from 'luxon';
import axios from 'axios';

export const condensedDate = () => {
  return getDate().split('/').reverse().join('');
};

const getDate = () => {
  return DateTime.now().toLocaleString({
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });
};

export async function fetchData(
  gamedayId: string,
  setGameData: React.Dispatch<React.SetStateAction<Game>>
) {
  try {
    const game = await axios.get(
      `https://je7nu5ny87.execute-api.us-east-1.amazonaws.com/dev/get-game-db/${gamedayId}`
    );
    setGameData(game.data.game);
  } catch (err) {
    console.error('Err:', err);
    return;
  }
}
