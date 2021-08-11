import { and, nand, nor, not } from '../gates';
import { io } from '../types';

export const sr = (qc: io, q: io, s: io, r: io) => {
  nor(qc, s, q);
  nor(q, r, qc);

  // repeat for complete cycle
  nor(qc, s, q);
  nor(q, r, qc);
};

export const d = (qc: io, q: io, d: io, clk: io) => {
  const _r: io = { v: 0 };
  const r: io = { v: d.v };
  const _d: io = { v: 0 };
  const _c: io = { v: 0 };

  not(_r, r);

  nand(_d, d, clk);
  nand(_c, _r, clk);

  sr(q, qc, _d, _c);
};

export const _d = (qc: io, q: io, d: io) => {
  const r: io = { v: d.v };
  const _r: io = { v: 0 };

  not(_r, r);

  sr(qc, q, d, _r);
};

export const jk = (q: io, qc: io, k: io, j: io, clk: io) => {
  const s: io = { v: 0 };
  const _k: io = { v: 0 };
  const r: io = { v: 0 };
  const _j: io = { v: 0 };
  const __j: io = { v: 0 };
  const __k: io = { v: 0 };

  and(_j, qc, j);
  and(__j, _j, clk);
  not(s, __j);

  and(_k, q, k);
  and(__k, _k, clk);
  not(r, __k);

  nand(q, s, qc);
  nand(qc, r, q);
  // repeat for complete cycle
  nand(q, s, qc);
  nand(qc, r, q);
};
