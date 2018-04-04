import itemTemplate from './itemTemplate';

const listTemplate = ({list}) => {
  let ul = '<ul>';
  list.forEach(item => ul += itemTemplate({item}));
  return ul += '</ul>';
};

export default listTemplate;
