import { bit, io } from '../types';

export const or = (o: io, a: io, b: io) => (o.v = (a.v | b.v) as bit);
export const and = (o: io, a: io, b: io) => (o.v = (a.v & b.v) as bit);
export const not = (o: io, i: io) => (o.v = (~i.v & 1) as bit);
export const xor = (o: io, a: io, b: io) => (o.v = (a.v ^ b.v) as bit);

export const nor = (o: io, a: io, b: io) => {
  const _o: io = { v: 0 };
  or(_o, a, b);
  not(o, _o);
};

export const nand = (o: io, a: io, b: io) => {
  const _o: io = { v: 0 };
  and(_o, a, b);
  not(o, _o);
};

export const xnor = (o: io, a: io, b: io) => {
  const _o: io = { v: 0 };
  xor(_o, a, b);
  not(o, _o);
};
