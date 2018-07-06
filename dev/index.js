import urlFns from './urlFunctions';
import fns from './fns';

import paintHomePage from './templatingFns/homepage/paint';
import paintListPage from  './templatingFns/listpage/paint';
import formEvent from './templatingFns/formEvent';
import aboutEvent from './templatingFns/aboutEvent';

import titleGenerator from './titleGenerator/generator';
import systemsGenerator from './systemsGenerator/generator';
import textGenerator from './textGenerator/generator';

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
    let seed = `${siteName}.${i}.${i * 100}.${i}.${siteName}`;
    seed += seed;
    let amount = fns.between({array: [1,3], seed});
    let title = Title.create({seed, amount});
    let { systems, releaseDate, consoleType } = systemsGenerator({seed, title});
    let text = textGenerator({seed, title: `<span class="emphasis">${title}</span>`, releaseDate, platform: systems, type: consoleType});

    let item = {
      title,
      text,
      releases: systems.reduce((str, console, i) => {
        return i === 0 ? `${console}` : `${str}, ${console}`;
      }, ''),
      releaseDate,
      number: i
    };

    list.push(item);
  }
  paintListPage({container, list, title: siteName, number});
  setTimeout(() => {
    document.querySelector("ul").scrollIntoView({behavior: 'smooth'});
  }, 100);
}

formEvent();
aboutEvent();
