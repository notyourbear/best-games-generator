import urlFns from './urlFunctions';
import paintHomePage from './templatingFns/homepage/paint';
import paintListPage from  './templatingFns/listpage/paint';

import titleGenerator from './titleGenerator/generator';
import systemsGenerator from './systemsGenerator/generator';

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
    let seed = title+i;
    let title = Title.create({seed, amount: 2});
    let { systems, releaseDate, consoleType } = systemsGenerator({seed, title});

    let item = {
      title,
      releases: systems.reduce((str, console, i) => {
        return i === 0 ? `${console}` : `${str}, ${console}`;
      }, ''),
      releaseDate,
      number: i
    };

    list.push(item);
  }
  console.log({list})
  paintListPage(container, list);
}
