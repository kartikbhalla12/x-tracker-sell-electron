const toggleBodyClass = () => {
  const body = document.querySelector('body');
  if (body) {
    body.classList.toggle('success-body');
  }
};

export default toggleBodyClass;
