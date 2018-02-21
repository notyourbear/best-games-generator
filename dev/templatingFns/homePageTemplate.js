const homePageTemplate = () =>
  `<form class='create-best-games'>
    <div>
      <input id='title-input' type='text' name='title' placeholder='Outlet Name'>
      <span>'s </span>
      <input id='amount-input' type='number' name='amount' placeholder='Number'>
      <span> best games of all time. </span>

      <input type='submit' name='submit' value='send'>
    </div>
   </form>`

export default homePageTemplate
