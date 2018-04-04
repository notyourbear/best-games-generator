import urlFns from './urlFunctions';
import paintHomePage from './templatingFns/homepage/paint';
import paintListPage from  './templatingFns/listpage/paint';

import titleGenerator from './titleGenerator/generator';
import consoleGenerator from './consoleGenerator/generator';

const parsedUrl = urlFns.parseUrl();
const isHomePage = parsedUrl.length === 0;
const container = document.querySelector('.container');

console.log({parsedUrl});

if (isHomePage) {
  paintHomePage(container);
} else {
  let [title, number] = parsedUrl;
  let Title = titleGenerator();

  let list = [];
  for (let i = number; i > 0; i--) {
    let seed = title+1;
    let item = {};
    item.title = Title.create({amount: 1, seed});
    item.releases = consoleGenerator({amount: 3, seed});
  }
  paintListPage(container, list);
}
