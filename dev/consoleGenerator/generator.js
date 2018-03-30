import consoles from './consoles.js';
import fns from '../titleGenerator/fns.js';

const generator = ({seed, amount}) => {
  const consoleArray = Object.values(consoles);
  const generation = fns.sample({array: consoleArray, seed});
  
  /*
    chooses between 0 - 8;
    chooses between 1 - 3;
    chooses between [0, additonals];
  */
};

export default generator;
