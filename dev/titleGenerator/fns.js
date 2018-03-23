import seedrandom from 'seedrandom';

const sample = ({ array, seed }) => {
  const rng = seed ? seedrandom(seed) : seedrandom();
  const index = Math.floor(rng() * array.length);
  return array[index];
}

const MarkovNode = ({entry, exit, value}) => {
  const state = {
    entry: false,
    exit: false,
    value: null
  };

  return Object.assign(state, { entry, exit, value});
};

const arrayMaker = ({input}) => {
  return input.split(' ');
};

const addToState = ({array, state = {}}) => {
  array.forEach((item, i) => {
    let nexti = i + 1;
    let previ = i - 1;

    const nodeState = {
      entry: false,
      exit: false,
      value: item
    };

    if (previ < 0) nodeState.entry = true;
    if (nexti >= array.length) nodeState.exit = true;

    if (state[item] === undefined) state[item] = [];
    state[item].push(MarkovNode(nodeState));
  });

  return state;
}

const getItem = state => sample(sample(state));
const switcher = direction => (direction === 'prev' ? 'next' : 'prev');

const createChain = ({state, amount}) => {
  let haveStart = false;
  let haveEnd = false;
  let direction = 'prev';
  let i = 0;

  let item = getItem(state);
  while (item.next === true && item.prev === true) {
    item = getItem(state);
  }

  let sentence = '';

  while (i < amount) {
    direction = switcher(direction);
    if (haveStart === true && haveEnd === true) break;
    if (haveStart && direction === 'prev') continue;
    if (haveEnd && direction === 'next') continue;

    item = getItem(state)
    sentence = direction === 'prev' ? `${item.value} ${sentence}` : `${sentence} ${item.value}`;

    haveStart = item.entry === true;
    haveEnd = item.exit === true;

    i++;
  }

  if (haveStart === false) {
    let item = getItem(state);
    while(item.entry !== true) {
      item = getItem(state);
    }

    sentence = `${item.prev} ${sentence}`;
  }

  if (haveEnd === false) {
    let item = getItem(state);
    while(item.exit !== true) {
      item = getItem(state);
    }
    sentence = `${sentence} ${item.next}`;
  }

  return sentence;
};

export default {
  sample,
  addToState,
  MarkovNode,
  arrayMaker,
  createChain,
  getItem,
  switcher
}
