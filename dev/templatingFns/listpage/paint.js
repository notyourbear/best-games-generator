import listTemplate from './listTemplate';

const paintListPage = ({container, list, title, number}) => {
  container.innerHTML = '';

  container.innerHTML = listTemplate({list, title, number});
};

export default paintListPage;
