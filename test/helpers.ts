import { _8encoder, _8decoder, _9encoder } from '../src/helpers';
import { addr, subr } from '../src/circuits';
import { _addr } from '../src/circuits/arithmetic';
import { bit, io } from '../src/types';

export const _io = (n: bit[]): io[] => {
  return n.map(b => {
    return { v: b };
  });
};

export const ___addr = (a: bit, b: bit, ci: bit) => {
  const io = _io([0, 0, a, b, ci]);
  _addr(io[0], io[1], io[2], io[3], io[4]);

  return _8encoder([0, 0, 0, 0, 0, 0, io[0].v, io[1].v]);
};

export const __addr = (a: number, b: number) => {
  const _a = _io(_8decoder(a));
  const _b = _io(_8decoder(b));
  const s = _io([0, 0, 0, 0, 0, 0, 0, 0]);
  const co: io = { v: 0 };

  addr(co, s, _a, _b);

  return _9encoder([
    co.v,
    s[0].v,
    s[1].v,
    s[2].v,
    s[3].v,
    s[4].v,
    s[5].v,
    s[6].v,
    s[7].v,
  ]);
};

export const __subr = (a: number, b: number) => {
  const _a = _io(_8decoder(a));
  const _b = _io(_8decoder(b));

  const s = _io([0, 0, 0, 0, 0, 0, 0, 0]);

  subr({ v: 0 }, s, _a, _b);

  return _8encoder([
    s[0].v,
    s[1].v,
    s[2].v,
    s[3].v,
    s[4].v,
    s[5].v,
    s[6].v,
    s[7].v,
  ]);
};
