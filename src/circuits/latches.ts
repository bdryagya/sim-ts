import { and, nand, nor, not } from '../gates';
import { io } from '../types';

export const sr = (qc: io, q: io, s: io, r: io) => {
  nor(qc, s, q);
  nor(q, r, qc);

  // feedback
  nor(qc, s, q);
  nor(q, r, qc);
};

export const d = (qc: io, q: io, d: io, en: io, dc: io, s: io, r: io) => {
  not(dc, d);

  and(s, dc, en);
  and(r, d, en);

  // sr complemented
  sr(qc, q, r, s);
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

export const r = (q: io[], _d: io[], en: io) => {
  const dc: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];

  const s: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];

  const r: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];

  const qc: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];

  d(qc[0], q[0], _d[0], en, dc[0], s[0], r[0]);

  d(qc[1], q[1], _d[1], en, dc[1], s[1], r[1]);
  d(qc[2], q[2], _d[2], en, dc[2], s[2], r[2]);
  d(qc[3], q[3], _d[3], en, dc[3], s[3], r[3]);
  d(qc[4], q[4], _d[4], en, dc[4], s[4], r[4]);
  d(qc[5], q[5], _d[5], en, dc[5], s[5], r[5]);
  d(qc[6], q[6], _d[6], en, dc[6], s[6], r[6]);
  d(qc[7], q[7], _d[7], en, dc[7], s[7], r[7]);
};
