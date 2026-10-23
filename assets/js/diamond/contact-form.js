const form = document.getElementById('contact-helpdesk-form');
if (form) {
  const submitBtn = document.getElementById('contact-submit-btn');
  const errorDiv = document.getElementById('contact-form-error');
  const formContainer = document.getElementById('contact-form-container');
  const successContainer = document.getElementById('contact-success-container');
  const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>' +
      submitBtn.dataset.sending;
    errorDiv.classList.add('d-none');

    try {
      const response = await fetch('https://diamond-contact-backend.diamond-helpdesk.workers.dev/', {
        method: 'POST',
        body: new FormData(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.');
      }

      formContainer.classList.add('d-none');
      successContainer.classList.remove('d-none');
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.classList.remove('d-none');
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;

      if (typeof turnstile !== 'undefined') {
        turnstile.reset();
      }
    }
  });
}
