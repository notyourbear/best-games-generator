import Deutung from 'deutung';

import fns from '../systemsGenerator/fns';

import general from './schema/general';
import genre from './schema/genre';
import mobile from './schema/mobile';
import singlePlatform from './schema/singlePlatform';

import game from './model/game';

const generator = ({title, platform, type, seed}) => {
  const model = Object.assign({}, game);
  model.game.title = title;
  model.game.platform = platform;

  const grammar =  Object.assign({}, general, genre, mobile, singlePlatform);

  const options = ['genre', 'general'];
  if (platform.length === 1) options.push('singlePlatform');
  if (type === 'mobile') options.push('mobile');

  const entry = options.reduce((string, option, i) => {
    const keyes = Object.keys(grammar);
    const matches = keyes.filter(key => key.match(option, 'g'));
    const sampled = fns.sample({array: matches, seed});
    return i === 0 ? `::!${sampled}::` : `${string} ::!${sampled}::`;
  }, '');

  const schema = { model, grammar, entry };
  console.log({schema})

  return Deutung(schema);
};

export default generator;
