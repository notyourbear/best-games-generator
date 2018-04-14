import homePageTemplate from './template';

const paintHomePage = container => {
  container.innerHTML = '';
  container.innerHTML = homePageTemplate();
}

export default paintHomePage;
