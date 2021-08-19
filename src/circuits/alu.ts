import { and, not, or } from '../gates';
import { io } from '../types';
import { addr, subr, _addr } from './arithmetic';
import { _dec } from './decoders';
import { _2mux, _4mux } from './multiplexers';

export const alu = (co: io, r: io[], a: io[], b: io[], f: io[], op: io[]) => {
  const _rsum: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];
  const _rsub: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];
  const _rand: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];
  const _ror: io[] = [
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
    { v: 0 },
  ];

  /**
   * OPCODES
   *
   * 00: ADD
   * 01: SUB
   * 10: OR
   * 11: AND
   */

  const _op: io[] = [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }];
  _dec(_op, op);

  // ADD
  const _sum_co: io = { v: 0 };
  addr(_sum_co, _rsum, a, b);

  // SUB
  const _sub_co: io = { v: 0 };
  subr(_sub_co, _rsub, a, b);

  and(_rand[7], a[7], b[7]);
  and(_rand[6], a[6], b[6]);
  and(_rand[5], a[5], b[5]);
  and(_rand[4], a[4], b[4]);
  and(_rand[3], a[3], b[3]);
  and(_rand[3], a[3], b[3]);
  and(_rand[2], a[2], b[2]);
  and(_rand[1], a[1], b[1]);
  and(_rand[0], a[0], b[0]);

  or(_ror[7], a[7], b[7]);
  or(_ror[6], a[6], b[6]);
  or(_ror[5], a[5], b[5]);
  or(_ror[4], a[4], b[4]);
  or(_ror[3], a[3], b[3]);
  or(_ror[3], a[3], b[3]);
  or(_ror[2], a[2], b[2]);
  or(_ror[1], a[1], b[1]);
  or(_ror[0], a[0], b[0]);

  // result
  _4mux(r[7], [_rand[7], _ror[7], _rsub[7], _rsum[7]], op);
  _4mux(r[6], [_rand[6], _ror[6], _rsub[6], _rsum[6]], op);
  _4mux(r[5], [_rand[5], _ror[5], _rsub[5], _rsum[5]], op);
  _4mux(r[4], [_rand[4], _ror[4], _rsub[4], _rsum[4]], op);
  _4mux(r[3], [_rand[3], _ror[3], _rsub[3], _rsum[3]], op);
  _4mux(r[2], [_rand[2], _ror[2], _rsub[2], _rsum[2]], op);
  _4mux(r[1], [_rand[1], _ror[1], _rsub[1], _rsum[1]], op);
  _4mux(r[0], [_rand[0], _ror[0], _rsub[0], _rsum[0]], op);

  // carry flag
  _4mux(co, [{ v: 0 }, { v: 0 }, _sub_co, _sum_co], _op);
  f[0].v = co.v;

  // eq flag
  const _e: io = { v: 0 };
  or(_e, _e, _rsub[7]);
  or(_e, _e, _rsub[6]);
  or(_e, _e, _rsub[5]);
  or(_e, _e, _rsub[4]);
  or(_e, _e, _rsub[3]);
  or(_e, _e, _rsub[2]);
  or(_e, _e, _rsub[1]);
  or(_e, _e, _rsub[0]);

  not(f[1], _e);

  // negative flag, OP is SUB and MSB is 1
  and(f[2], r[0], _op[2]);
};
