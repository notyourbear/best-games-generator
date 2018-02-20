const homePageTemplate = () =>
  `<form class='createBestGames'>
    <label for='title'>Title</title>
    <input id='title-input' type='text' name='title'>
    <label for='high'>From</title>
    <input id='high-input' type='number' name='high' value='50'>
    <label for='low'>To</title>
    <input id='low-input' type='number' name='low' value='40'>
    <input type='submit' value='Go'>
   </form>`

export default homePageTemplate
