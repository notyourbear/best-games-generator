import urlFns from './urlFunctions'
import paintHomePage from './templatingFns/paintHomePage'

const parsedUrl = urlFns.parseUrl()
const isHomePage = parsedUrl.length === 0
const container = document.querySelector('.container')

if (isHomePage) {
  paintHomePage(container)
}
