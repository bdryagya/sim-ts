import { __7addr, __7subr } from './helpers';

describe('Circuit Tests', () => {
  test('adder', () => {
    expect(__7addr(124, 12)).toBe(136);
  });

  test('substractor', () => {
    expect(__7subr(124, 12)).toBe(112);
  });
});
