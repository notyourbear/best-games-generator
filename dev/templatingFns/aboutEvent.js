const aboutEvent = () => {
  const callout = document.querySelector('.about-callout');
  const about = document.querySelector('.about');

  callout.addEventListener('click', e => {
    e.preventDefault();
    about.classList.remove('offscreen');
  });

  about.addEventListener('click', e => {
    e.preventDefault();
    about.classList.add('offscreen');
  });
}

export default aboutEvent;
