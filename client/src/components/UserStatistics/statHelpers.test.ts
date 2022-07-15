import { todayIsDone } from './statHelpers';
import { data01, data03 } from './testData';

describe('todayIsDone', () => {
  it('returns false if array is empty', () => {
    expect(todayIsDone([], 'xxxxxx')).toBe(false);
  });

  it('returns false if gamedayId is not in array', () => {
    expect(todayIsDone(data01, 'xxxxxx')).toBe(false);
    expect(todayIsDone(data01, '220102')).toBe(false);
    expect(todayIsDone(data03, '220102')).toBe(false);
    expect(todayIsDone(data03, '220431')).toBe(false);
    expect(todayIsDone(data03, '220511')).toBe(false);
  });

  it('returns true if gamedayId IS in array', () => {
    expect(todayIsDone(data01, '220101')).toBe(true);
    expect(todayIsDone(data03, '220501')).toBe(true);
    expect(todayIsDone(data03, '220505')).toBe(true);
    expect(todayIsDone(data03, '220510')).toBe(true);
  });
});
