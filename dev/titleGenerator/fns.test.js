import fns from './fns';

describe('title generator functions', () => {
  describe('switcher', () => {
    test('switches to prev or next', () => {
      expect(fns.switcher('next')).toEqual('prev');
      expect(fns.switcher('prev')).toEqual('next');
    });
  });
});
