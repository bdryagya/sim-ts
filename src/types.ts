export type bit = 0 | 1;

export type io = {
  v: bit;
};

export type sr_io = {
  s: io;
  r: io;
  q: io;
  q_: io;
};

export type addr_io = {
  a: io;
  b: io;
  ci: io;
  s: io;
  co: io;
};

export type u_io = {
  i: io;
  o: io;
};

export type b_io = {
  a: io;
  b: io;
  o: io;
};
