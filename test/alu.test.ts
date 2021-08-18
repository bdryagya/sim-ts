import { alu } from '../src/circuits/alu';
import { __8decoder, __8encoder } from '../src/helpers';
import { io } from '../src/types';
import { _io } from './helpers';

describe('ALU', () => {
  test('sum', () => {
    const co: io = { v: 0 };
    const f: io[] = _io([0, 0, 0, 0]);
    const r: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);

    alu(co, r, __8decoder(123), __8decoder(111), f, _io([0, 0]));
    expect(__8encoder(r)).toBe(123 + 111);
    expect(co.v).toBe(0);

    alu(co, r, __8decoder(255), __8decoder(1), f, _io([0, 0]));
    expect(__8encoder(r)).toBe(0);
    expect(co.v).toBe(1);
  });

  test('sub', () => {
    const co: io = { v: 0 };
    const f: io[] = _io([0, 0, 0, 0]);
    const r: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);

    alu(co, r, __8decoder(123), __8decoder(111), f, _io([0, 1]));
    expect(__8encoder(r)).toBe(123 - 111);
    expect(co.v).toBe(0);

    alu(co, r, __8decoder(111), __8decoder(123), f, _io([0, 1]));
    expect(__8encoder(r)).toBe(256 - (123 - 111));
    expect(co.v).toBe(0);
  });

  test('or', () => {
    const co: io = { v: 0 };
    const f: io[] = _io([0, 0, 0, 0]);
    const r: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);

    alu(co, r, __8decoder(123), __8decoder(111), f, _io([1, 0]));
    expect(__8encoder(r)).toBe(123 | 111);

    alu(co, r, __8decoder(255), __8decoder(0), f, _io([1, 0]));
    expect(__8encoder(r)).toBe(255 | 0);
  });

  test('and', () => {
    const co: io = { v: 0 };
    const f: io[] = _io([0, 0, 0, 0]);
    const r: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);

    alu(co, r, __8decoder(123), __8decoder(111), f, _io([1, 1]));
    expect(__8encoder(r)).toBe(123 & 111);

    alu(co, r, __8decoder(255), __8decoder(0), f, _io([1, 1]));
    expect(__8encoder(r)).toBe(255 & 0);

    alu(co, r, __8decoder(0), __8decoder(255), f, _io([1, 1]));
    expect(__8encoder(r)).toBe(255 & 0);
  });
});
describe('Flags', () => {
  test('carry flag', () => {
    const co: io = { v: 0 };
    const f: io[] = _io([0, 0, 0, 0]);
    const r: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);

    alu(co, r, __8decoder(255), __8decoder(1), f, _io([0, 0]));
    expect(f).toEqual(_io([1, 0, 0, 0]));
  });

  test('zero flag', () => {
    const co: io = { v: 0 };
    const f: io[] = _io([0, 0, 0, 0]);
    const r: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);

    alu(co, r, __8decoder(127), __8decoder(127), f, _io([0, 1]));
    expect(f).toEqual(_io([0, 1, 0, 0]));

    alu(co, r, __8decoder(127), __8decoder(126), f, _io([0, 1]));
    expect(f).toEqual(_io([0, 0, 0, 0]));
  });

  test('negative flag', () => {
    const co: io = { v: 0 };
    const f: io[] = _io([0, 0, 0, 0]);
    const r: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0]);

    alu(co, r, __8decoder(12), __8decoder(127), f, _io([0, 1]));
    expect(f).toEqual(_io([0, 0, 1, 0]));
  });
});
