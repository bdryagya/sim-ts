import { and, or, not, xor } from '../gates';
import { bit } from '../types';

// full adder
export const addr = (a: bit, b: bit, ci: bit) => [
  or(and(a, b), and(xor(a, b), ci)),
  xor(xor(a, b), ci),
];

// 7 bit adder
export const _7addr = (a: bit[], b: bit[]) => {
  const s1 = addr(a[7], b[7], 0);
  const s2 = addr(a[6], b[6], s1[0]);
  const s3 = addr(a[5], b[5], s2[0]);
  const s4 = addr(a[4], b[4], s3[0]);
  const s5 = addr(a[3], b[3], s4[0]);
  const s6 = addr(a[2], b[2], s5[0]);
  const s7 = addr(a[1], b[1], s6[0]);

  return [s7[0], s7[1], s6[1], s5[1], s4[1], s3[1], s2[1], s1[1]];
};

// 7 bit substractor
export const _7subr = (a: bit[], b: bit[]) => {
  const s1 = addr(a[7], not(b[7]), 1);
  const s2 = addr(a[6], not(b[6]), s1[0]);
  const s3 = addr(a[5], not(b[5]), s2[0]);
  const s4 = addr(a[4], not(b[4]), s3[0]);
  const s5 = addr(a[3], not(b[3]), s4[0]);
  const s6 = addr(a[2], not(b[2]), s5[0]);
  const s7 = addr(a[1], not(b[1]), s6[0]);
  const s8 = addr(a[0], not(b[0]), s7[0]);

  return [s8[1], s7[1], s6[1], s5[1], s4[1], s3[1], s2[1], s1[1]];
};
