import { bit } from '../types';

export const or = (a: bit, b: bit): bit => (a | b) as bit;
export const and = (a: bit, b: bit): bit => (a & b) as bit;
export const not = (a: bit): bit => (~a & 1) as bit;

export const xor = (a: bit, b: bit): bit => (a ^ b) as bit;
export const nor = (a: bit, b: bit): bit => not(or(a, b));
export const nand = (a: bit, b: bit): bit => not(and(a, b));
export const xnor = (a: bit, b: bit): bit => not(xor(a, b));
