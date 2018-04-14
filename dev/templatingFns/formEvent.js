import urlFns from '../urlFunctions';

const formEvent = () => {
  const form = document.querySelector('form');
  console.log({form})
  form.addEventListener('submit', e => {
    console.log({e, form})
    e.preventDefault();
    const inputs = ['title', 'amount'];
    const data = inputs.map((id, i) => {
      var input = document.querySelector(`#${id}-input`);
      return (i === 0) ? input.value : parseInt(input.value, 10);
    });

    if (urlFns.validateInputs(data)) {
      urlFns.setUrl(...data);
    }
  });
}

export default formEvent;
