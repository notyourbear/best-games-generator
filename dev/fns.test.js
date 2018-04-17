import fns from './fns';

describe('functions', () => {
  describe('between', () => {
    test('returns a number between 1 and 5, inclusive', () => {
      const result = fns.between({array: [1,5]});
      expect(result <= 5).toBe(true);
      expect(result >= 1).toBe(true);
    });

    test('returns the number 3', () => {
      const result = fns.between({array: [1,5], seed: '32'});
      expect(result).toEqual(3);
    });
  });

  describe('plaformCentric', () => {
    test('return array with value N64', () => {
      const title = 'Archibald 64';
      const expected = ['N64'];
      expect(fns.platformCentric({title})).toEqual(expect.arrayContaining(expected));
    });

    test('return array with value SNES', () => {
      const title = 'Super Archibald';
      const expected = ['SNES'];
      expect(fns.platformCentric({title})).toEqual(expect.arrayContaining(expected));
    });

    test('return array with value U', () => {
      const title = 'Archibald U';
      const expected = ['Wii U'];
      expect(fns.platformCentric({title})).toEqual(expect.arrayContaining(expected));
    });

    test('return false', () => {
      const title = 'Archibald';
      expect(fns.platformCentric({title})).toBe(false);
    });
  });

  describe('switcher', () => {
    test('switches to prev or next', () => {
      expect(fns.switcher('next')).toEqual('prev');
      expect(fns.switcher('prev')).toEqual('next');
    });
  });

  describe('arrayMaker', () => {
    test('returns an array of words', () => {
      const opts = { input:  'this is a test.' };
      const expected = ['this', 'is', 'a', 'test.'];
      expect(fns.arrayMaker(opts)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('getPart', () => {
    test('return a unique part', () => {
      const state = ['hello', 'world'];
      const array = ['hello'];
      const result = fns.getPart({array, state});
      expect(result).toBe('world');
    });
  });

  describe('sample', () => {
    test('returns a random item from array', () => {
      const array = [1,2,3];
      const result = fns.sample({array});
      const isTrue = result === 1 || result === 2 || result === 3;
      expect(isTrue).toBe(true);
    });

    test('returns a seeded random number', () => {
      const array = [1,2,3,4,5,6];
      const result = fns.sample({array, seed: 'imagine 1'});
      expect(result).toEqual(4);
    });
  });

  describe('addToState', () => {
    test('creates a state with three items', () => {
      const array = ['hey', 'you', 'there'];
      const expected = {
        entry: ['hey'],
        exit: ['there'],
        node: {
          hey: [{
            entry: true,
            exit: false,
            value: 'hey'
          }],
          you: [{
            entry: false,
            exit: false,
            value: 'you'
          }],
          there: [{
            entry: false,
            exit: true,
            value: 'there'
          }]
        }
      };

      expect(fns.addToState({array})).toEqual(expect.objectContaining(expected));
    });
  });

  describe('createChain', () => {
    const state = {
      entry: ['hey', 'hello'],
      exit: ['there', 'where'],
      node: {
        hey: [{
          entry: true,
          exit: false,
          value: 'hey'
        }],
        hello: [{
          entry: true,
          exit: false,
          value: 'hello'
        }],
        you: [{
          entry: false,
          exit: false,
          value: 'you'
        }],
        are: [{
          entry: false,
          exit: false,
          value: 'are'
        }],
        out: [{
          entry: false,
          exit: false,
          value: 'out'
        }],
        there: [{
          entry: false,
          exit: true,
          value: 'there'
        }],
        where: [{
          entry: false,
          exit: true,
          value: 'where'
        }]
      }
    };

    expect(fns.createChain({state, amount: 1, seed: 'anybody'})).toEqual('hey where')
  });
});
