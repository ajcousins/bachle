import {
  getMaxStreak,
  getCurrentStreak,
  getScoreDistribution,
} from './statHelpers';
import {
  data01,
  data02,
  data03,
  data04,
  data05,
  data06,
  data07,
  data08,
  data09,
  data10,
  data11,
  data12,
  data13,
} from './testData';

describe('Get score distribution', () => {
  it('handles undefined', () => {
    expect(getScoreDistribution(undefined)).toEqual({
      lose: 0,
      1: 0,
      2: 0,
      3: 0,
    });
  });

  it('returns correct score array', () => {
    expect(getScoreDistribution(data01)).toEqual({ lose: 1, 1: 0, 2: 0, 3: 0 });
    expect(getScoreDistribution(data02)).toEqual({ lose: 0, 1: 1, 2: 0, 3: 0 });
    expect(getScoreDistribution(data03)).toEqual({ lose: 3, 1: 7, 2: 0, 3: 0 });
    expect(getScoreDistribution(data05)).toEqual({ lose: 2, 1: 5, 2: 1, 3: 2 });
  });
});

describe('Get max streak', () => {
  it('returns 0 from undefined', () => {
    expect(getMaxStreak(undefined)).toEqual(0);
  });

  it('returns 0 from zero wins', () => {
    expect(getMaxStreak(data01)).toEqual(0);
  });

  it('returns 1 from one win', () => {
    expect(getMaxStreak(data02)).toEqual(1);
  });

  it('returns 3 from max streak', () => {
    expect(getMaxStreak(data03)).toEqual(3);
  });

  it('returns 5 from max streak, one guess', () => {
    expect(getMaxStreak(data04)).toEqual(5);
  });

  it('returns 5 from max streak, multiple guesses', () => {
    expect(getMaxStreak(data05)).toEqual(5);
  });

  it('returns 5 from max streak, missed days', () => {
    expect(getMaxStreak(data06)).toEqual(3);
  });
});

describe('Get current streak', () => {
  it('returns 0 from undefined', () => {
    expect(getCurrentStreak(undefined, undefined)).toEqual(0);
  });

  it('returns 0 from zero wins', () => {
    expect(getCurrentStreak(data01, '220703')).toEqual(0);
  });

  it('returns 0 from one win', () => {
    expect(getCurrentStreak(data02, '220703')).toEqual(0);
  });

  it('returns 2 from current streak', () => {
    expect(getCurrentStreak(data03, '220510')).toEqual(2);
  });

  it('returns 0 from current streak', () => {
    expect(getCurrentStreak(data04, '220510')).toEqual(0);
  });

  it('returns 3 from current streak, multiple guesses', () => {
    expect(getCurrentStreak(data05, '220510')).toEqual(3);
  });

  it('returns 1 from current streak, missed days', () => {
    expect(getCurrentStreak(data06, '220510')).toEqual(1);
  });

  it('returns 9 from current streak', () => {
    expect(getCurrentStreak(data07, '220510')).toEqual(9);
  });

  it('returns 8 from current streak, missing end', () => {
    expect(getCurrentStreak(data08, '220510')).toEqual(0);
  });
});

describe('iPhone debug 1', () => {
  it('should return max streak of 3', () => {
    expect(getMaxStreak(data09)).toEqual(3);
  });
  it('should return current streak of 0', () => {
    expect(getCurrentStreak(data09, '220709')).toEqual(0);
  });
  it('should return current streak of 1', () => {
    expect(getCurrentStreak(data09, '220708')).toEqual(1);
  });
});

describe('iPhone debug 2', () => {
  it('should return max streak of 3', () => {
    expect(getMaxStreak(data10)).toEqual(3);
  });
  it('should return current streak of 0', () => {
    expect(getCurrentStreak(data10, '220709')).toEqual(2);
  });
});

describe('iPhone debug 3, Tina iPhone - 220706', () => {
  it('should return correct current streak - 220706', () => {
    expect(getCurrentStreak(data11, '220706')).toEqual(1);
  });
  it('should return correct max streak - 220706', () => {
    expect(getMaxStreak(data11)).toEqual(4);
  });
});

describe('iPhone debug 3, Tina iPhone - 220708', () => {
  it('should return correct current streak - 220708', () => {
    expect(getCurrentStreak(data12, '220708')).toEqual(3);
  });
  it('should return correct max streak - 220708', () => {
    expect(getMaxStreak(data12)).toEqual(4);
  });
});

describe('iPhone debug 3, Tina iPhone - 220711', () => {
  it('should return correct current streak - 220711', () => {
    expect(getCurrentStreak(data13, '220711')).toEqual(6);
  });
  it('should return correct max streak - 220711', () => {
    expect(getMaxStreak(data13)).toEqual(6);
  });
});
