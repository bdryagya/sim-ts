import { bit, io } from '../types';

export const or = (o: io, a: io, b: io) => (o.v = (a.v | b.v) as bit);
export const and = (o: io, a: io, b: io) => (o.v = (a.v & b.v) as bit);
export const not = (i: io) => (i.v = (~i.v & 1) as bit);
export const xor = (o: io, a: io, b: io) => (o.v = (a.v ^ b.v) as bit);

export const nor = (o: io, a: io, b: io) => {
  or(o, a, b);
  not(o);
};

export const nand = (o: io, a: io, b: io) => {
  and(o, a, b);
  not(o);
};

export const xnor = (o: io, a: io, b: io) => {
  xor(o, a, b);
  not(o);
};
