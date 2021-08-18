import { _2mux, _4mux } from '../src/circuits/multiplexers';
import { _io } from './helpers';
import { io } from '../src/types';

describe('_2mux, 2:1', () => {
  test('1', () => {
    const o: io = { v: 0 };

    _2mux(o, _io([0, 1]), { v: 0 });
    expect(o.v).toEqual(1);

    _2mux(o, _io([0, 1]), { v: 1 });
    expect(o.v).toEqual(0);
  });

  test('2', () => {
    const o: io = { v: 0 };

    _2mux(o, _io([1, 0]), { v: 1 });
    expect(o.v).toEqual(1);

    _2mux(o, _io([1, 0]), { v: 0 });
    expect(o.v).toEqual(0);
  });
});
describe('_4mux, 4:1', () => {
  test('1', () => {
    const o: io = { v: 0 };

    _4mux(o, _io([0, 0, 0, 1]), _io([0, 0]));
    expect(o.v).toEqual(1);

    _4mux(o, _io([0, 0, 0, 1]), _io([0, 1]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([0, 0, 0, 1]), _io([1, 0]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([0, 0, 0, 1]), _io([1, 1]));
    expect(o.v).toEqual(0);
  });

  test('2', () => {
    const o: io = { v: 0 };

    _4mux(o, _io([0, 0, 1, 0]), _io([0, 0]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([0, 0, 1, 0]), _io([0, 1]));
    expect(o.v).toEqual(1);

    _4mux(o, _io([0, 0, 1, 0]), _io([1, 0]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([0, 0, 1, 0]), _io([1, 1]));
    expect(o.v).toEqual(0);
  });

  test('3', () => {
    const o: io = { v: 0 };

    _4mux(o, _io([0, 1, 0, 0]), _io([0, 0]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([0, 1, 0, 0]), _io([0, 1]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([0, 1, 0, 0]), _io([1, 0]));
    expect(o.v).toEqual(1);

    _4mux(o, _io([0, 1, 0, 0]), _io([1, 1]));
    expect(o.v).toEqual(0);
  });

  test('4', () => {
    const o: io = { v: 0 };

    _4mux(o, _io([1, 0, 0, 0]), _io([0, 0]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([1, 0, 0, 0]), _io([0, 1]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([1, 0, 0, 0]), _io([1, 0]));
    expect(o.v).toEqual(0);

    _4mux(o, _io([1, 0, 0, 0]), _io([1, 1]));
    expect(o.v).toEqual(1);
  });
});
