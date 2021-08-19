import { and, not, or } from '../gates';
import { io } from '../types';
import { _addr_subr } from './arithmetic';
import { _dec } from './decoders';
import { _2mux, _4mux } from './multiplexers';

export const alu = (co: io, r: io[], a: io[], b: io[], f: io[], op: io[]) => {
  const _rsum_sub: io[] = [
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

  // SUM and SUB
  _addr_subr(co, _rsum_sub, a, b, _op[2]);

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
  _4mux(r[7], [_rand[7], _ror[7], _rsum_sub[7], _rsum_sub[7]], op);
  _4mux(r[6], [_rand[6], _ror[6], _rsum_sub[6], _rsum_sub[6]], op);
  _4mux(r[5], [_rand[5], _ror[5], _rsum_sub[5], _rsum_sub[5]], op);
  _4mux(r[4], [_rand[4], _ror[4], _rsum_sub[4], _rsum_sub[4]], op);
  _4mux(r[3], [_rand[3], _ror[3], _rsum_sub[3], _rsum_sub[3]], op);
  _4mux(r[2], [_rand[2], _ror[2], _rsum_sub[2], _rsum_sub[2]], op);
  _4mux(r[1], [_rand[1], _ror[1], _rsum_sub[1], _rsum_sub[1]], op);
  _4mux(r[0], [_rand[0], _ror[0], _rsum_sub[0], _rsum_sub[0]], op);

  // carry flag
  _4mux(co, [{ v: 0 }, { v: 0 }, co, co], _op);
  f[0].v = co.v;

  // eq flag
  const _e: io = { v: 0 };
  or(_e, _e, _rsum_sub[7]);
  or(_e, _e, _rsum_sub[6]);
  or(_e, _e, _rsum_sub[5]);
  or(_e, _e, _rsum_sub[4]);
  or(_e, _e, _rsum_sub[3]);
  or(_e, _e, _rsum_sub[2]);
  or(_e, _e, _rsum_sub[1]);
  or(_e, _e, _rsum_sub[0]);

  not(f[1], _e);

  // negative flag, OP is SUB and MSB is 1
  and(f[2], r[0], _op[2]);

  // zero flag, result is 0
  const _z: io = { v: 0 };
  or(_z, _z, _rsum_sub[0]);
  or(_z, _z, _rsum_sub[1]);
  or(_z, _z, _rsum_sub[2]);
  or(_z, _z, _rsum_sub[3]);
  or(_z, _z, _rsum_sub[4]);
  or(_z, _z, _rsum_sub[5]);
  or(_z, _z, _rsum_sub[6]);
  or(_z, _z, _rsum_sub[7]);

  not(f[3], _z);
};
