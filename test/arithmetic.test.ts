import { _io, __addr, __subr, ___addr } from './helpers';

describe('Arithmetic', () => {
  test('_addr', () => {
    expect(___addr(0, 0, 0)).toBe(0);
    expect(___addr(0, 0, 1)).toBe(1);
    expect(___addr(0, 1, 0)).toBe(1);
    expect(___addr(0, 1, 1)).toBe(2);
    expect(___addr(1, 0, 0)).toBe(1);
    expect(___addr(1, 0, 1)).toBe(2);
    expect(___addr(1, 1, 0)).toBe(2);
    expect(___addr(1, 1, 1)).toBe(3);
  });

  test('addr', () => {
    expect(__addr(0, 0)).toBe(0 + 0);
    expect(__addr(0, 1)).toBe(0 + 1);
    expect(__addr(124, 12)).toBe(124 + 12);
    expect(__addr(127, 127)).toBe(127 + 127);
  });

  test('subr', () => {
    expect(__subr(0, 0)).toBe(0 - 0);
    expect(__subr(1, 1)).toBe(1 - 1);
    expect(__subr(124, 12)).toBe(124 - 12);
    expect(__subr(20, 10)).toBe(20 - 10);
    expect(__subr(127, 127)).toBe(127 - 127);

    // negative = a + (-b) => -b = 256 - b;
    expect(__subr(0, 1)).toBe(0 + (256 - 1));
    expect(__subr(12, 124)).toBe(12 + (256 - 124));
    expect(__subr(10, 20)).toBe(10 + (256 - 20));
    expect(__subr(9, 20)).toBe(9 + (256 - 20));
    expect(__subr(1, 101)).toBe(1 + (256 - 101));
  });
});
