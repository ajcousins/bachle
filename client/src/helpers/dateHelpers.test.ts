import { consecDateStrings, yesterdayId } from './dateHelpers';


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

describe('yesterdayId', () => {
  it('returns yesterday', () => {
    expect(yesterdayId('220504')).toEqual('220503');
    expect(yesterdayId('220503')).toEqual('220502');
    expect(yesterdayId('220502')).toEqual('220501');
    expect(yesterdayId('220501')).toEqual('220430');
    expect(yesterdayId('220430')).toEqual('220429');
    expect(yesterdayId('220429')).toEqual('220428');
  });
});