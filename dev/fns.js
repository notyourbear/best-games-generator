import seedrandom from 'seedrandom';

const sample = ({ array, seed, amount }) => {
  const rng = seed ? seedrandom(seed) : seedrandom();
  let amountLeft = amount || 1;
  let results = [];
  let options = array.slice();
  while (amountLeft > 0) {
    amountLeft--;
    let index = Math.floor(rng() * options.length);
    let option = options.splice(index, 1);
    results = results.concat(option);
  }

  return results.length === 1 ? results[0] : results;
}

const arrayMaker = ({input}) => input.split(' ');

const addToState = ({array, state = { entry: [], exit: [], node: {}}}) => {
  array.forEach((value, i) => {
    let nexti = i + 1;
    let previ = i - 1;

    const node = {
      value,
      entry: false,
      exit: false
    };

    if (previ < 0) {
      node.entry = true;
      state.entry.push(value);
    }

    if (nexti >= array.length) {
      node.exit = true;
      state.exit.push(value);
    }

    if (state.node[value] === undefined) state.node[value] = [];
    state.node[value].push(node);
  });

  return state;
};

const getItem = ({state, seed}) => {
  let array = Array.isArray(state) ?
    sample({array: state, seed}) :
    sample({array: Object.values(state), seed});

  return sample({array, seed});
};

const switcher = direction => (direction === 'prev' ? 'next' : 'prev');

const createChain = ({state, amount, seed}) => {
  let haveStart = false;
  let haveEnd = false;
  let direction = 'prev';
  let i = 0;
  let item = getItem({seed, state: state.node});
  let newSeed = 0;

  while (item.entry === true && item.exit === true) {
    item = getItem({seed: seed + newSeed, state: state.node});
    newSeed++;
    haveStart = item.entry === true;
    haveEnd = item.exit === true;
  }

  let parts = [];
  while (i < amount) {
    direction = switcher(direction);
    i++;
    if (haveStart === true && haveEnd === true) break;
    if (haveStart && direction === 'prev') continue;
    if (haveEnd && direction === 'next') continue;

    item = getItem({seed: seed + i, state: state.node});
    if (parts.includes(item.value)) continue;

    if (direction === 'prev') parts.push(item.value);
    if (direction === 'next') parts.unshift(item.value);
    haveStart = item.entry === true;
    haveEnd = item.exit === true;
  }

  if (haveStart === false) {
    let v = getPart({array: parts, state: state.entry, seed});
    parts.unshift(v);
  }

  if (haveEnd === false) {
    let v = getPart({array: parts, state: state.exit, seed});
    parts.push(v);
  }

  if (i < amount) {
    let v = getPart({array: parts, state: state.exit, seed});
    parts.push(v);
  }

  return parts.join(' ');
};

const getPart = ({array, state, seed}) => {
  let value = sample({array: state, seed});
  let i = 0;

  while (array.includes(value)) {
    value = sample({array: state, seed: seed + i});
    i++;
  }

  return value;
}

const between = ({array, seed}) => {
  const [start, end] = array;
  const opts = [];
  for(let i = start; i <= end; i++) {
    opts.push(i);
  }

  return sample({array: opts, seed});
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
  sample,
  getPart,
  addToState,
  arrayMaker,
  createChain,
  getItem,
  switcher,
  between,
  platformCentric
}
