import Deutung from 'deutung';

import fns from '../fns';

import general from './schema/general';
import genre from './schema/genre';
import mobile from './schema/mobile';
import singlePlatform from './schema/singlePlatform';
import difficulty from './schema/difficulty';
import features from './schema/features';
import artStyle from './schema/artStyle';
import review from './schema/review';

import game from './model/game';
import site from './model/site';

const generator = ({title, platform, releaseDate, type, seed}) => {
  const model = Object.assign({}, game, site);
  model.game.title = title;
  model.game.platform = platform;
  model.game.releaseDate = releaseDate;

  const grammar =  Object.assign({},
    general,
    review,
    genre,
    mobile,
    singlePlatform,
    difficulty,
    features,
    artStyle);

  const options = ['genre', 'general', 'review', 'difficulty', 'features', 'artStyle'];
  if (platform.length === 1) options.push('singlePlatform');
  if (type === 'mobile') options.push('mobile');

  let descriptors = fns.sample({array: options, seed, amount: 3});

  const entry = descriptors.reduce((string, option, i) => {
    const keyes = Object.keys(grammar);
    const matches = keyes.filter(key => key.match(option, 'g'));
    const sampled = fns.sample({array: matches, seed});
    return i === 0 ? `::!${sampled}::` : `${string} ::!${sampled}::`;
  }, '');

  const schema = { model, grammar, entry };

  return Deutung(schema, {seed}).compiled;
};

export default generator;
