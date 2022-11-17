const buildDate = require('./buildDate');

describe('buildDate', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-31'));
  });
  test('gmail', () => {
    expect(buildDate('google', 1)).toBe('+newer_than:1d');
    expect(buildDate('google', 3)).toBe('+newer_than:3d');
  });

  test('yahoo', () => {
    expect(buildDate('yahoo', 2)).toBe(' after:"2020-01-29"');
  });

  test('proton', () => {
    expect(buildDate('proton', 9)).toBe('&begin=1579611600');
  });
});
