import urlFns from './urlFunctions';
import paintHomePage from './templatingFns/homepage/paint';
import paintListPage from  './templatingFns/listpage/paint';
import formEvent from './templatingFns/formEvent';

import titleGenerator from './titleGenerator/generator';
import systemsGenerator from './systemsGenerator/generator';

const parsedUrl = urlFns.parseUrl();
const isHomePage = parsedUrl.length === 0;

const container = document.querySelector('.container');

if (isHomePage) {
  paintHomePage(container);
} else {
  let [siteName, number] = parsedUrl;
  let Title = titleGenerator();

  let list = [];
  for (let i = number; i > 0; i--) {
    let seed = siteName+i;
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
  paintListPage({container, list, title: siteName, amount: number});
  setTimeout(() => {
    document.querySelector("ul").scrollIntoView({behavior: 'smooth'});
  }, 100);
}

formEvent();
