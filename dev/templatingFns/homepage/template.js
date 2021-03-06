const homePageTemplate = (data = {}) => {
  const title = data.title || 'Polygonal';
  const number = data.number || 50;

  document.title = `The ${number} best games of all time - ${title}`;

  return `
    <div class='about offscreen'>
      <div>×</div>
      <h3>What Even Is This?</h3>
      <p>To celebrate their fifth birthday, the website Polygon decided to rank the 500 best games of all time.</p>
      <p>To pay homage, I thought it would be a fun project to create a generative version. </p>
      <p>The generator uses the title of the site as the seed for randomization; this makes a list easy to share, should you find a made up list that you think is worth sharing.</p>
    </div>
    <div class='form-container'>
      <div class='about-callout'>What even is this?</div>
      <div class="background-logo"></div>
      <form class='form create-best-games'>
        <input id='title-input' type='text' name='title' value='${title}' autofocus>
        <div>
          <span> The </span>
          <input id='amount-input' type='number' name='amount' value=${number}>
          <span> best games of all time</span>
        </div>
        <span> After weeks of voting and arguments, we’re ready to present our choices </span>
        <input id='submit-input' type='submit' name='submit' value='View Now'>
     </form>
    </div>`;
}


export default homePageTemplate;
