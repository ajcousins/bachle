import { getStreak } from './UserStatistics';
import { data01, data02, data03, data04, data05, data06 } from './testData';

describe('getStreak', () => {
  it('returns 0 from zero wins', () => {
    expect(getStreak(data01)).toEqual(0);
  });

  it('returns 1 from one win', () => {
    expect(getStreak(data02)).toEqual(1);
  });

  it('returns 3 from max streak', () => {
    expect(getStreak(data03)).toEqual(3);
  });

  it('returns 5 from max streak, one guess', () => {
    expect(getStreak(data04)).toEqual(5);
  });

  it('returns 5 from max streak, multiple guesses', () => {
    expect(getStreak(data05)).toEqual(5);
  });

  it('returns 5 from max streak, missed days', () => {
    expect(getStreak(data06)).toEqual(3);
  });
});
