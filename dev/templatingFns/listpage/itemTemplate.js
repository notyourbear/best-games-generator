const itemTemplate = ({item}) =>
  `<li>
    <h2>${item.number}. ${item.title}</h2>
    <p>(${item.releases})</p>
    <p>these are words. they are a lot of words. then there are more words. how amazing.</p>
  </li>`;

export default itemTemplate;
