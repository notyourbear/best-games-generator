const parseUrl = () => {
  if (window.location.search === '') return []

  const loc = window.location.search.split('/').slice(1)
  const showResults = validateInputs(loc)
  return showResults ? loc : []
}

const setUrl = (title, start, end) =>
  window.location.assign(`?/${title}/${start}-${end}`)

function validateInputs(inputs) {
  const initCheck = (inputs.length === 2) && inputs[1].includes('-')
  if (initCheck === false) return false

  const [title, nums] = inputs
  if (title.length === 0) return false

  const digits = nums.split('-').map(Number)
  return digits[0] > digits[1]
}

export default { parseUrl, setUrl }
