import systemSchema from './systems.js';
import fns from './fns.js';

const generator = (obj = {}) => {
  let {amount, seed, title} = obj;

  const consoleTypes = ['portable', 'console', 'mobile', 'pc'];
  const consoleType = fns.sample({array: consoleTypes, seed});

  const platformOptions = fns.sample({array: systemSchema[consoleType], seed});
  const {systems, releaseDates} = platformOptions;

  const result = {
    consoleType,
    releaseDate: fns.between({array: releaseDates, seed})
  }

  if (title) {
    let singlePlatform = fns.platformCentric({title});
    if (singlePlatform !== false) {
      result.systems = singlePlatform;
      return result;
    }
  }

  // --------platform gen assuming its title agnostic--------
  if (amount === undefined) {
    const amountArray = [1, systems.length];
    amount = fns.between({array: amountArray, seed});
  }

  const plats = [];
  for (let i = 0; i < amount; i++) {
    let console = fns.sample({array: systems, seed});
    let consoleIndex = systems.indexOf(console);
    plats.push(systems.splice(consoleIndex, 1).pop());
  }

  result.systems = plats;
  return result;
};

export default generator;
