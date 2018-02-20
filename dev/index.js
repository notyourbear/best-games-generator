import urlFns from './urlFunctions'
import paintHomePage from './templatingFns/paintHomePage'

const isHomePage = urlFns.parseUrl().length === 0
const container = document.querySelector('.container')

if (isHomePage) {
  paintHomePage(container)
}
