import fns from './fns.js';
import titles from './titles.js';

const populateState = ({array, state}) => {
  array.forEach(input => {
    let a = fns.arrayMaker({input});
    fns.addToState({array: a, state});
  });
};

const create = ({state}) => (options = { amount: 3 }) => {
  let { amount, seed } = options;
  return fns.createChain({state, amount, seed});
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
