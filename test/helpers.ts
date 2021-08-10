import { _7encoder, _7decoder, _8encoder, _8decoder } from '../src/helpers';
import { _7addr, _7subr } from '../src/circuits';
import { bit, io } from '../src/types';

export const _io = (n: bit[]): io[] => {
  return n.map(b => {
    return { v: b };
  });
};

export const __7addr = (a: number, b: number) => {
  const _a = _io(_7decoder(a));
  const _b = _io(_7decoder(b));
  const s = _io([0, 0, 0, 0, 0, 0, 0]);
  const co: io = { v: 0 };

  _7addr(co, s, _a, _b);

  return _8encoder([
    co.v,
    s[0].v,
    s[1].v,
    s[2].v,
    s[3].v,
    s[4].v,
    s[5].v,
    s[6].v,
  ]);
};

export const __7subr = (a: number, b: number) => {
  const _a = _io(_8decoder(a));
  const _b = _io(_8decoder(b));
  const s = _io([0, 0, 0, 0, 0, 0, 0, 0]);

  _7subr({ v: 0 }, s, _a, _b);

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
