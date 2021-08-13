import { and, not, or, xor } from '../gates';
import { io } from '../types';

// full adder
export const _addr = (co: io, s: io, a: io, b: io, ci: io) => {
  const _co1: io = { v: 0 };
  const _co2: io = { v: 0 };

  xor(s, a, b);
  and(_co1, a, b);
  and(_co2, s, ci);
  xor(s, s, ci);
  or(co, _co1, _co2);
};

// 7 bit adder
export const addr = (co: io, s: io[], a: io[], b: io[]) => {
  _addr(co, s[7], a[7], b[7], { v: 0 });
  _addr(co, s[6], a[6], b[6], co);
  _addr(co, s[5], a[5], b[5], co);
  _addr(co, s[4], a[4], b[4], co);
  _addr(co, s[3], a[3], b[3], co);
  _addr(co, s[2], a[2], b[2], co);
  _addr(co, s[1], a[1], b[1], co);
  _addr(co, s[0], a[0], b[0], co);
};

// 7 bit substractor
export const subr = (co: io, s: io[], a: io[], b: io[]) => {
  // invert b
  const _b: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];

  not(_b[0], b[0]);
  not(_b[1], b[1]);
  not(_b[2], b[2]);
  not(_b[3], b[3]);
  not(_b[4], b[4]);
  not(_b[5], b[5]);
  not(_b[6], b[6]);
  not(_b[7], b[7]);

  // carry 1 for two's complement
  _addr(co, s[7], a[7], _b[7], { v: 1 });
  _addr(co, s[6], a[6], _b[6], co);
  _addr(co, s[5], a[5], _b[5], co);
  _addr(co, s[4], a[4], _b[4], co);
  _addr(co, s[3], a[3], _b[3], co);
  _addr(co, s[2], a[2], _b[2], co);
  _addr(co, s[1], a[1], _b[1], co);
  _addr(co, s[0], a[0], _b[0], co);
};
