import Markov from './generator.js';

describe('Markov', () => {
  test('create works', () => {
    const gen = Markov();
    const val = gen.create();
    expect(typeof val === 'string').toBe(true);
  });

  test('returns ten unique items', () => {
    const gen = Markov();
    let unique = true;
    let prev;
    for(let i = 0; i < 20; i++) {
      const val = gen.create();
      if (i !== 0) {
        unique = prev !== val;
      }
      if (unique === false) break;
      prev = val;
      console.log(val)
    }

    expect(unique).toBe(true);
  });

  test('returns the same item ten times', () => {
    const gen = Markov();
    let same = true;
    let prev;
    for(let i = 0; i < 10; i++) {
      const val = gen.create({seed: '3'});
      if (i !== 0) {
        same = prev === val;
      }
      if (same === false) break;
      prev = val;
    }

    expect(same).toBe(true);
  });
});
