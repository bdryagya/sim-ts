import { bit } from '../types';

export const or = (a: bit, b: bit): bit => (a | b) as bit;
export const and = (a: bit, b: bit): bit => (a & b) as bit;
export const not = (a: bit): bit => (~a & 1) as bit;
export const xor = (a: bit, b: bit): bit => (a ^ b) as bit;
