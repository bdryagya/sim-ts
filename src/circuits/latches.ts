import { nand, nor, not } from '../gates';
import { io } from '../types';

export const sr = (qc: io, q: io, s: io, r: io) => {
  nor(qc, s, q);
  nor(q, r, qc);
  nor(qc, s, q);
};

export const d = (qc: io, q: io, d: io, clk: io) => {
  const r: io = { v: d.v };
  const _d: io = { v: 0 };
  const _c: io = { v: 0 };

  not(r);

  nand(_d, d, clk);
  nand(_c, r, clk);

  sr(q, qc, _d, _c);
};

export const _d = (qc: io, q: io, d: io) => {
  const r: io = { v: d.v };

  not(r);

  sr(qc, q, d, r);
};
