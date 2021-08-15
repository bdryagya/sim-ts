import { dec } from '../src/circuits/decoders';
import { io } from '../src/types';
import { _io } from './helpers';

describe('Decoder', () => {
  test('4 bit decoder', () => {
    const o: io[] = _io([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    dec(o, _io([0, 0, 0, 0]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]));

    dec(o, _io([0, 0, 0, 1]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]));

    dec(o, _io([0, 0, 1, 0]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]));

    dec(o, _io([0, 0, 1, 1]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]));

    dec(o, _io([0, 1, 0, 0]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]));

    dec(o, _io([0, 1, 0, 1]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0]));

    dec(o, _io([0, 1, 1, 0]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([0, 1, 1, 1]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 0, 0, 0]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 0, 0, 1]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 0, 1, 0]));
    expect(o).toEqual(_io([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 0, 1, 1]));
    expect(o).toEqual(_io([0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 1, 0, 0]));
    expect(o).toEqual(_io([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 1, 0, 1]));
    expect(o).toEqual(_io([0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 1, 1, 0]));
    expect(o).toEqual(_io([0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

    dec(o, _io([1, 1, 1, 1]));
    expect(o).toEqual(_io([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  });
});
