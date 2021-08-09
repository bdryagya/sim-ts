import { _8encoder, _8decoder } from '../src/helpers';
import { _7addr, _7subr } from '../src/circuits';

export const __7addr = (a: number, b: number) =>
  _8encoder(_7addr(_8decoder(a), _8decoder(b)));

// @ts-ignore
export const __7subr = (a: number, b: number) =>
  _8encoder(_7subr(_8decoder(a), _8decoder(b)));
