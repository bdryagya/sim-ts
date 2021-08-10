import { _io, __7addr, __7subr, __addr } from './helpers';
import { _7addr, _7subr } from '../src/circuits';
import { sr } from '../src/circuits/latches';
import { io } from '../src/types';

describe('Arithmetic Tests', () => {
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
    expect(__7addr(0, 0)).toBe(0 + 0);
    expect(__7addr(0, 1)).toBe(0 + 1);
    expect(__7addr(124, 12)).toBe(124 + 12);
    expect(__7addr(127, 127)).toBe(127 + 127);
  });

  test('_7subr', () => {
    expect(__7subr(0, 0)).toBe(0 - 0);
    expect(__7subr(1, 1)).toBe(1 - 1);
    expect(__7subr(124, 12)).toBe(124 - 12);
    expect(__7subr(20, 10)).toBe(20 - 10);
    expect(__7subr(127, 127)).toBe(127 - 127);

    // negative = a + (-b) => -b = 256 - b;
    expect(__7subr(0, 1)).toBe(0 + (256 - 1));
    expect(__7subr(12, 124)).toBe(12 + (256 - 124));
    expect(__7subr(10, 20)).toBe(10 + (256 - 20));
    expect(__7subr(9, 20)).toBe(9 + (256 - 20));
    expect(__7subr(1, 101)).toBe(1 + (256 - 101));
  });
});

describe('SR Latch', () => {
  const io: io[] = _io([0, 0, 0, 0]);

  test('default state', () => {
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });

  test('set', () => {
    // set;
    io[2].v = 1;
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);

    io[2].v = 0;
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);
  });

  test('reset', () => {
    // reset
    io[3].v = 1;
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);

    io[3].v = 0;
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);

    io[3].v = 1;
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });
});
