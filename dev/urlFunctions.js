const parseUrl = () => {
  if (window.location.search === '') return []

  const loc = window.location.search.split('/').slice(1)
  const showResults = validateInputs(loc)
  return showResults ? loc : []
}

const setUrl = (title, amount) =>
  window.location.assign(`?/${title}/${amount}`)

function validateInputs(inputs) {
  const initCheck = inputs.length === 2
  if (initCheck === false) return false

  const [title, num] = inputs
  if (title.length === 0) return false

  return parseInt(num, 10) > 0
}

export default { parseUrl, setUrl, validateInputs }
