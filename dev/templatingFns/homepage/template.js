const homePageTemplate = (data = {}) => {
  const title = data.title || 'Polygonal';
  const number = data.number || 50;

  document.title = `The ${number} best games of all time - ${title}`;

  return `
    <div class='offscreen'>
      <h3>What Even Is This?</h3>
      <p>To celebrate their fifth birthday, the website Polygon decided to rank the 500 best games of all time.</p>
      <p>To pay homage, I thought it would be a fun project to create a generative version. </p>
      <p>The generator uses the title of the site as the seed for randomization; this makes a list easy to share, should you find a made up list that you think is worth sharing.</p>
      <p>As example, in a universe where the website Polygonal exists, it's 11th best game of all time will always be a game called <span class="emphasis">Offworld Deadly Company</span>, a game I would most definitively play.</p>
    </div>
    <div class='form-container'>
      <div class='about'>What even is this?</div>
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
