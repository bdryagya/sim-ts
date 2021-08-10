import { _io, __7addr, __7subr, __addr } from './helpers';
import { _7addr, _7subr } from '../src/circuits';

describe('Circuit Tests', () => {
  test('addr', () => {
    expect(__addr(0, 0, 0)).toBe(0);
    expect(__addr(0, 0, 1)).toBe(1);
    expect(__addr(0, 1, 0)).toBe(1);
    expect(__addr(0, 1, 1)).toBe(2);
    expect(__addr(1, 0, 0)).toBe(1);
    expect(__addr(1, 0, 1)).toBe(2);
    expect(__addr(1, 1, 0)).toBe(2);
    expect(__addr(1, 1, 1)).toBe(3);
  });

  test('_7addr', () => {
    expect(__7addr(124, 12)).toBe(136);
  });

  test('_7subr', () => {
    expect(__7subr(124, 12)).toBe(112);
  });
});
