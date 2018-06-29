import Deutung from 'deutung';

import fns from '../fns';

import general from './schema/general';
import genre from './schema/genre';
import mobile from './schema/mobile';
import singlePlatform from './schema/singlePlatform';
import difficulty from './schema/difficulty';
import features from './schema/features';
import artStyle from './schema/art';
import animation from './schema/animation';
import review from './schema/review';
import plot from './schema/plot';
import critique from './schema/critique';

import game from './model/game';
import site from './model/site';
import art from './model/art';

const generator = ({title, platform, releaseDate, type, seed}) => {
  const model = Object.assign({}, game, site, art);
  model.game.title = title;
  model.game.platform = platform;
  model.game.releaseDate = '' + releaseDate;

  const grammar =  Object.assign({}, general);
  Object.assign(grammar, review);
  Object.assign(grammar, genre);
  Object.assign(grammar, mobile);
  Object.assign(grammar, singlePlatform);
  Object.assign(grammar, difficulty);
  Object.assign(grammar, plot);
  Object.assign(grammar, critique);
  Object.assign(grammar, features);
  Object.assign(grammar, artStyle);
  Object.assign(grammar, animation);

  const options = ['plot', 'genre', 'general', 'review', 'difficulty', 'features', 'art', 'animation', 'critique'];
  if (platform.length === 1) options.push('singlePlatform');
  if (type === 'mobile') options.push('mobile');

  const descriptors = fns.sample({array: options, seed, amount: 3});

  const entry = descriptors.reduce((string, option, i) => {
    const keyes = Object.keys(grammar);
    const matches = keyes.filter(key => key.match(option, 'g'));
    const sampled = fns.sample({array: matches, seed});
    return i === 0 ? `::!${sampled}::` : `${string} ::!${sampled}::`;
  }, '');

  const schema = { model, grammar, entry };
  const generated = Deutung(schema, {seed});
  return generated.compiled;
};

export default generator;
