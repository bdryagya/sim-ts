import { and, not, or, xor } from '../gates';
import { io } from '../types';

// full adder
export const addr = (co: io, s: io, a: io, b: io, ci: io) => {
  const _co1: io = { v: 0 };
  const _co2: io = { v: 0 };

  xor(s, a, b);
  and(_co1, a, b);
  and(_co2, s, ci);
  xor(s, s, ci);
  or(co, _co1, _co2);
};

// 7 bit adder
export const _7addr = (co: io, s: io[], a: io[], b: io[]) => {
  addr(co, s[6], a[6], b[6], { v: 0 });
  addr(co, s[5], a[5], b[5], co);
  addr(co, s[4], a[4], b[4], co);
  addr(co, s[3], a[3], b[3], co);
  addr(co, s[2], a[2], b[2], co);
  addr(co, s[1], a[1], b[1], co);
  addr(co, s[0], a[0], b[0], co);
};

// 7 bit substractor
export const _7subr = (co: io, s: io[], a: io[], b: io[]) => {
  // invert b
  not(b[0]);
  not(b[1]);
  not(b[2]);
  not(b[3]);
  not(b[4]);
  not(b[5]);
  not(b[6]);

  // carry 1 for two's complement
  addr(co, s[6], a[6], b[6], { v: 1 });
  addr(co, s[5], a[5], b[5], co);
  addr(co, s[4], a[4], b[4], co);
  addr(co, s[3], a[3], b[3], co);
  addr(co, s[2], a[2], b[2], co);
  addr(co, s[1], a[1], b[1], co);
  addr(co, s[0], a[0], b[0], co);
};
