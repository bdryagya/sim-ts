import { _io, __7addr, __7subr } from './helpers';
import { addr, _7addr, _7subr } from '../src/circuits';

describe('Circuit Tests', () => {
  test('addr', () => {
    const io = _io([0, 0, 0, 0, 0]);

    io[4].v = 1;
    addr(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);

    io[4].v = 0;
    io[2].v = 1;
    addr(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);

    io[3].v = 1;
    addr(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);

    io[4].v = 1;
    addr(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([1, 1]);
  });

  test('_7addr', () => {
    expect(__7addr(124, 12)).toBe(136);
  });

  test('_7subr', () => {
    expect(__7subr(124, 12)).toBe(112);
  });
});
