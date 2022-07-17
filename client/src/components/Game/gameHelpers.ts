import { DateTime } from 'luxon';
import axios from 'axios';

export const condensedDate = () => {
  return getDate().split('/').reverse().join('');
};

const getDate = () => {
  return DateTime.now().toFormat('yyMMdd');
};

export async function fetchData(
  gamedayId: string,
) {
  try {
    const game = await axios.get(
      `https://je7nu5ny87.execute-api.us-east-1.amazonaws.com/dev/get-game-db/${gamedayId}`
    );
    return game
  } catch (err) {
    console.error('Err:', err);
    return;
  }
}
