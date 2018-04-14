import itemTemplate from './itemTemplate';
import homePageTemplate from '../homepage/template';

const listTemplate = ({list, title, number}) => {
  let template = homePageTemplate({title, number});
  let ul = '<ul>';
  list.forEach(item => ul += itemTemplate({item}));
  ul += '</ul>';
  return template + ul;
};

export default listTemplate;
