import systems from './systems.js';
import fns from '../titleGenerator/fns.js';

const generator = (obj = {}) => {
  let {amount, seed} = obj;
  const consoleArray = Object.values(systems);
  const generation = fns.sample({array: consoleArray, seed}).slice();

  if (amount === undefined) {
    const amountArray = [];
    for (let i = 0; i < generation.length; i++) {
      amountArray.push(i + 1);
    }

    amount = fns.sample({array: amountArray, seed});
  }

  const result = [];
  for (let i = 0; i < amount; i++) {
    let console = fns.sample({array: generation, seed});
    let consoleIndex = generation.indexOf(console);
    result.push(generation.splice(consoleIndex, 1).pop());
  }

  return result;
};

export default generator;
