const buildDate = require('./buildDate');

describe('buildDate daysAgo', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-31T00:00:00.000+00:00'));
  });
  test('gmail', () => {
    expect(buildDate('google', 1)).toBe('+newer_than:1d');
    expect(buildDate('google', 3)).toBe('+newer_than:3d');
  });

  test('yahoo', () => {
    expect(buildDate('yahoo', 2)).toBe(' after:"2020-01-29"');
  });

  test('proton', () => {
    expect(buildDate('proton', 9)).toBe('&begin=1579651200');
  });
});

describe('buildDate hoursAgo', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-31T00:00:00.000+00:00'));
  });
  test('gmail', () => {
    expect(buildDate('google', null, 1)).toBe('+newer_than:1h');
    expect(buildDate('google', null, 3)).toBe('+newer_than:3h');
    expect(buildDate('google', 2, 3)).toBe('+newer_than:3h');
  });

  test('yahoo', () => {
    expect(buildDate('yahoo', null, 2)).toBe(null);
    expect(buildDate('yahoo', 2, null)).toBe(' after:"2020-01-29"');
  });

  test('proton', () => {
    expect(buildDate('proton', null, 1)).toBe('&begin=1580425200');
    expect(buildDate('proton', null, 3)).toBe('&begin=1580418000');
  });
});
