import listTemplate from './listTemplate';

const paintListPage = (container, list) => {
  container.innerHTML = '';
  container.innerHTML = listTemplate({list});
};

export default paintListPage;
