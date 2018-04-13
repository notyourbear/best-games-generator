import fns from './fns';

describe('systems generator functions', () => {
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
});
