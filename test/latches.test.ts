import { _io } from './helpers';
import { io } from '../src/types';
import { d, jk, _d, sr } from '../src/circuits';
import { r } from '../src/circuits/latches';

describe('SR Latch', () => {
  test('default state', () => {
    const io: io[] = _io([0, 0, 0, 0]);

    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });

  test('set', () => {
    const io: io[] = _io([0, 0, 0, 0]);

    io[2].v = 1;
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);

    io[2].v = 0;
    sr(io[0], io[1], io[2], io[3]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);
  });

  test('reset', () => {
    const io: io[] = _io([0, 0, 0, 1]);

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

describe('D Latch', () => {
  test('default state', () => {
    const io: io[] = _io([0, 0, 0, 0, 0, 0, 0]);

    d(io[0], io[1], io[2], io[3], io[4], io[5], io[6]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);

    io[3].v = 1;
    io[2].v = 0;

    d(io[0], io[1], io[2], io[3], io[4], io[5], io[6]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });

  test('data', () => {
    const io: io[] = _io([0, 0, 1, 1, 0, 0, 0]);

    d(io[0], io[1], io[2], io[3], io[4], io[5], io[6]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);

    io[2].v = 0;
    io[3].v = 0;
    d(io[0], io[1], io[2], io[3], io[4], io[5], io[6]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);
  });

  test('no-data', () => {
    const io: io[] = _io([0, 0, 0, 1, 0, 0, 0]);
    d(io[0], io[1], io[2], io[3], io[4], io[5], io[6]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });
});

describe('D Latch NOR', () => {
  const io: io[] = _io([0, 0, 0]);

  test('default state', () => {
    _d(io[0], io[1], io[2]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });

  test('data', () => {
    io[2].v = 1;
    _d(io[0], io[1], io[2]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);
  });

  test('no-data', () => {
    io[2].v = 0;
    _d(io[0], io[1], io[2]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });
});

describe('JK Flip Flop', () => {
  test('default state', () => {
    const io: io[] = _io([0, 0, 0, 0, 1]);

    jk(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);
  });

  test('set', () => {
    const io: io[] = _io([0, 0, 0, 0, 1]);

    jk(io[0], io[1], io[2], io[3], io[4]);

    io[2].v = 1;
    jk(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);
  });

  test('reset', () => {
    const io: io[] = _io([0, 0, 0, 0, 1]);

    jk(io[0], io[1], io[2], io[3], io[4]);

    io[3].v = 1;
    jk(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);
  });

  test('toggle', () => {
    const io: io[] = _io([0, 0, 0, 0, 1]);

    jk(io[0], io[1], io[2], io[3], io[4]);

    io[2].v = 1;
    io[3].v = 1;

    jk(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);

    jk(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);

    jk(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([1, 0]);

    jk(io[0], io[1], io[2], io[3], io[4]);
    expect([io[0].v, io[1].v]).toEqual([0, 1]);
  });
});

describe('Register', () => {
  test('default state', () => {
    const d: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);
    const q: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);
    const en: io = { v: 0 };

    r(q, d, en);
    expect(q).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0]));

    r(q, d, en);
    expect(q).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0]));
  });

  test('not enabled', () => {
    const q: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);
    const d: io[] = _io([1, 1, 1, 1, 1, 1, 1, 1]);
    const en: io = { v: 0 };

    r(q, d, en);
    expect(q).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0]));

    r(q, d, en);
    expect(q).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0]));
  });

  test('data, enabled', () => {
    const q: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);
    const d: io[] = _io([1, 1, 1, 1, 1, 1, 1, 1]);
    const en: io = { v: 1 };

    r(q, d, en);
    expect(q).toEqual(_io([1, 1, 1, 1, 1, 1, 1, 1]));

    r(q, d, en);
    expect(q).toEqual(_io([1, 1, 1, 1, 1, 1, 1, 1]));

    en.v = 0;

    r(q, d, en);
    expect(q).toEqual(_io([1, 1, 1, 1, 1, 1, 1, 1]));
  });
});
