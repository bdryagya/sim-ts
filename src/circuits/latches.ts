import { and, nand, nor, not } from '../gates';
import { io } from '../types';

export const sr = (qc: io, q: io, s: io, r: io) => {
  nor(qc, s, q);
  nor(q, r, qc);

  // feedback
  nor(qc, s, q);
  nor(q, r, qc);
};

export const d = (qc: io, q: io, d: io, en: io) => {
  const _r: io = { v: 0 };
  const r: io = { v: d.v };
  const _d: io = { v: 0 };
  const _c: io = { v: 0 };

  not(_r, r);

  nand(_d, d, en);
  nand(_c, _r, en);

  sr(q, qc, _d, _c);
};

export const _d = (qc: io, q: io, d: io) => {
  const r: io = { v: d.v };
  const _r: io = { v: 0 };

  not(_r, r);

  sr(qc, q, d, _r);
};

export const jk = (qc: io, q: io, j: io, k: io, en: io) => {
  const s: io = { v: 0 };
  const _k: io = { v: 0 };
  const r: io = { v: 0 };
  const _j: io = { v: 0 };
  const __j: io = { v: 0 };
  const __k: io = { v: 0 };

  and(_j, qc, j);
  and(__j, _j, en);
  not(s, __j);

  and(_k, q, k);
  and(__k, _k, en);
  not(r, __k);

  nand(q, s, qc);
  nand(qc, r, q);

  // feedback
  nand(q, s, qc);
  nand(qc, r, q);
};
