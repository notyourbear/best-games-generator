import generator from './generator.js';

describe('Title Generator', () => {
  test('outputs an array of consoles', () => {
    const arr = generator();
    expect(Array.isArray(arr)).toBe(true);
  });

  test('outputs an array of 1 console', () => {
    const arr = generator({amount: 1});
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toEqual(1);
  });

  test('outputs the same array of 2 console', () => {
    const arr = generator({amount: 2, seed: '234'});
    expect(Array.isArray(arr)).toBe(true);
    expect(arr.length).toEqual(2);
    expect(arr).toEqual(expect.arrayContaining([ 'Genesis', 'Neo Geo' ]))
  });
});
