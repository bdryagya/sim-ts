import { bit } from '../types';

export const _8decoder = (n: number): bit[] =>
  [
    (n & (1 << 7)) >> 7,
    (n & (1 << 6)) >> 6,
    (n & (1 << 5)) >> 5,
    (n & (1 << 4)) >> 4,
    (n & (1 << 3)) >> 3,
    (n & (1 << 2)) >> 2,
    (n & (1 << 1)) >> 1,
    n & 1,
  ] as bit[];

export const _8encoder = (o: bit[]) =>
  (o[0] << 7) |
  (o[1] << 6) |
  (o[2] << 5) |
  (o[3] << 4) |
  (o[4] << 3) |
  (o[5] << 2) |
  (o[6] << 1) |
  o[7];
