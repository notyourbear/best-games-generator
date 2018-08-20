import fns from '../fns.js';
import titles from './titles.js';

const populateState = ({array, state}) => {
  array.forEach(input => {
    let a = fns.arrayMaker({input});
    fns.addToState({array: a, state});
  });
};

const create = ({state}) => (options = { amount: 2 }) => {
  let { amount, seed } = options;
  let title = fns.createChain({state, amount, seed});
  while (titles.includes(title)) {
    seed = seed += '1';
    title = fns.createChain({state, amount, seed});
  }
  return title;
}

const Markov = () => {
  const state = {
    entry: [],
    exit: [],
    node: {}
  };

  populateState({array:titles, state});
  return  { create: create({state}) };
};

export default Markov;
