import { and, not, or } from '../gates';
import { io } from '../types';

export const _2mux = (o: io, i: io[], c: io) => {
  const _o: io[] = [{ v: 0 }, { v: 0 }];
  const cc: io = { v: 0 };
  not(cc, c);

  and(_o[1], i[0], c);
  and(_o[0], i[1], cc);

  or(o, _o[0], _o[1]);
};

export const _4mux = (o: io, i: io[], c: io[]) => {
  const _o: io[] = [{ v: 0 }, { v: 0 }, { v: 0 }, { v: 0 }];
  const cc: io[] = [{ v: 0 }, { v: 0 }];

  not(cc[0], c[0]);
  not(cc[1], c[1]);

  and(_o[3], cc[0], cc[1]);
  and(_o[3], _o[3], i[3]);

  and(_o[2], cc[0], c[1]);
  and(_o[2], _o[2], i[2]);

  and(_o[1], c[0], cc[1]);
  and(_o[1], _o[1], i[1]);

  and(_o[0], c[0], c[1]);
  and(_o[0], _o[0], i[0]);

  or(o, _o[0], _o[1]);
  or(o, o, _o[2]);
  or(o, o, _o[3]);
};
