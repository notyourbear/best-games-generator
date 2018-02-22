const homePageTemplate = () =>
  `<form class='create-best-games'>
      <input id='title-input' type='text' name='title' value='Not Polygon' autofocus>
      <div>
        <span> The </span>
        <input id='amount-input' type='number' name='amount' value='50'>
        <span> best games of all time</span>
      </div>
      <span> After weeks of voting and arguments, we’re ready to present our choices </span>
      <input id='submit-input' type='submit' name='submit' value='View Now'>
   </form>`

export default homePageTemplate
