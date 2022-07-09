import { consecDateStrings } from './dateHelpers';


describe('consecDateStrings', () => {
  it('returns correct range of dates', () => {
    expect(consecDateStrings('220329').slice(0, 5)).toEqual([
      '220329',
      '220330',
      '220331',
      '220401',
      '220402',
    ]);
  });
});
