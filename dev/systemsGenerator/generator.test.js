import generator from './generator.js';

describe('Title Generator', () => {
  test('outputs a stack of console info', () => {
    const { consoleType, releaseDate, systems } = generator();
    expect(Array.isArray(systems)).toBe(true);
    expect(['portable', 'console', 'mobile', 'pc'].includes(consoleType)).toBe(true);
    expect(releaseDate <= 2018).toBe(true);
  });

  test('outputs an array of 1 console for systems', () => {
    const { consoleType, releaseDate, systems } = generator({amount: 1});
    expect(Array.isArray(systems)).toBe(true);
    expect(systems.length).toEqual(1);
    expect(['portable', 'console', 'mobile', 'pc'].includes(consoleType)).toBe(true);
    expect(releaseDate <= 2018).toBe(true);
  });

  test('outputs a specific input of 2 consoles', () => {
    const { consoleType, releaseDate, systems } = generator({amount: 2, seed: '231'});
    expect(Array.isArray(systems)).toBe(true);
    expect(systems.length).toEqual(2);
    expect(systems).toEqual(expect.arrayContaining([ 'Saturn', 'Jaguar' ]))
    expect(consoleType).toBe('console');
    expect(releaseDate).toBe(1995);
  });
});
