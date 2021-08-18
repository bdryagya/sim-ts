import { and, not } from '../gates';
import { io } from '../types';

export const _dec = (o: io[], i: io[]) => {
  const ic: io[] = [{ v: 0 }, { v: 0 }];

  not(ic[0], i[0]);
  not(ic[1], i[1]);

  // 4th bit, 00
  and(o[3], ic[0], ic[1]);

  // 3rd bit, 01
  and(o[2], ic[0], i[1]);

  // 2nd bit, 10
  and(o[1], i[0], ic[1]);

  // 1st bit, 11
  and(o[0], i[0], i[1]);
};

export const dec = (o: io[], i: io[]) => {
  const ic: io[] = [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }];

  not(ic[0], i[0]);
  not(ic[1], i[1]);
  not(ic[2], i[2]);
  not(ic[3], i[3]);

  // 16th bit, 0000
  and(o[15], ic[0], ic[1]);
  and(o[15], o[15], ic[2]);
  and(o[15], o[15], ic[3]);

  // 15th bit, 0001
  and(o[14], ic[0], ic[1]);
  and(o[14], o[14], ic[2]);
  and(o[14], o[14], i[3]);

  // 14th bit, 0010
  and(o[13], ic[0], ic[1]);
  and(o[13], o[13], i[2]);
  and(o[13], o[13], ic[3]);

  // 13th bit, 0011
  and(o[12], ic[0], ic[1]);
  and(o[12], o[12], i[2]);
  and(o[12], o[12], i[3]);

  // 12th bit, 0100
  and(o[11], ic[0], i[1]);
  and(o[11], o[11], ic[2]);
  and(o[11], o[11], ic[3]);

  // 11th bit, 0101
  and(o[10], ic[0], i[1]);
  and(o[10], o[10], ic[2]);
  and(o[10], o[10], i[3]);

  // 10th bit, 0110
  and(o[9], ic[0], i[1]);
  and(o[9], o[9], i[2]);
  and(o[9], o[9], ic[3]);

  // 9th bit, 0111
  and(o[8], ic[0], i[1]);
  and(o[8], o[8], i[2]);
  and(o[8], o[8], i[3]);

  // 8th bit, 1000
  and(o[7], i[0], ic[1]);
  and(o[7], o[7], ic[2]);
  and(o[7], o[7], ic[3]);

  // 7th bit, 1001
  and(o[6], i[0], ic[1]);
  and(o[6], o[6], ic[2]);
  and(o[6], o[6], i[3]);

  // 6th bit, 1010
  and(o[5], i[0], ic[1]);
  and(o[5], o[5], i[2]);
  and(o[5], o[5], ic[3]);

  // 5th bit, 1011
  and(o[4], i[0], ic[1]);
  and(o[4], o[4], i[2]);
  and(o[4], o[4], i[3]);

  // 4th bit, 1100
  and(o[3], i[0], i[1]);
  and(o[3], o[3], ic[2]);
  and(o[3], o[3], ic[3]);

  // 3rd bit, 1101
  and(o[2], i[0], i[1]);
  and(o[2], o[2], ic[2]);
  and(o[2], o[2], i[3]);

  // 2nd bit, 1110
  and(o[1], i[0], i[1]);
  and(o[1], o[1], i[2]);
  and(o[1], o[1], ic[3]);

  // 1st bit, 1111
  and(o[0], i[0], i[1]);
  and(o[0], o[0], i[2]);
  and(o[0], o[0], i[3]);
};
