import titleFns from '../titleGenerator/fns.js';

const between = ({array, seed}) => {
  const [start, end] = array;
  const opts = [];
  for(let i = start; i < end; i++) {
    opts.push(i);
  }

  return titleFns.sample({array: opts, seed});
}

const platformCentric = ({ title }) => {
  switch (true) {
  case title.includes('64'): return ['N64'];
  case title.includes('Super'): return ['SNES'];
  case title.includes(' U'): return ['Wii U'];
  default: return false;
  }
}

export default {
  between,
  platformCentric,
  sample: titleFns.sample
}
