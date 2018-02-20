import homePageTemplate from './homePageTemplate'
import urlFns from '../urlFunctions'

const paintHomePage = container => {
  container.innerHTML = ''
  container.innerHTML = homePageTemplate()

  const form = container.querySelector('.createBestGames')

  form.addEventListener('submit', e => {
    e.preventDefault()
    const inputs = ['title', 'high', 'low']
    const data = inputs.map((id, i) => {
      var input = document.querySelector(`#${id}-input`)
      return (i === 0) ? input.value : parseInt(input.value, 10)
    })
    urlFns.setUrl(...data)
  })
}

export default paintHomePage
