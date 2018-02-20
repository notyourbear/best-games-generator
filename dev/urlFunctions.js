const parseUrl = () => {
  switch (true) {
    case window.location.search === '': return [];
    default: return window.location.search.split('/').slice(1)
  }
}

const setUrl = (title, start, end) =>
  window.location.assign(`?/${title}/${start}-${end}`)

export default { parseUrl, setUrl }
