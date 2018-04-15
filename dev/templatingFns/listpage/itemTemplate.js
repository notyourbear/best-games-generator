const itemTemplate = ({item}) =>
  `<li>
    <h2>${item.number}. ${item.title}</h2>
    <p>(${item.releaseDate}, ${item.releases})</p>
    <p>${item.text}</p>
  </li>`;

export default itemTemplate;
