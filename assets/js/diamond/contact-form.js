const form = document.getElementById('contact-helpdesk-form');
if (form) {
    const submitBtn = document.getElementById('contact-submit-btn');
    const errorDiv = document.getElementById('contact-form-error');
    const formContainer = document.getElementById('contact-form-container');
    const successContainer = document.getElementById('contact-success-container');
    const successTitle = document.getElementById('contact-success-title');
    const originalBtnContent = submitBtn.innerHTML;

    const showSending = () => {
        submitBtn.disabled = true;
        submitBtn.innerHTML =
            '<span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>' +
            submitBtn.dataset.sending;
        errorDiv.hidden = true;
    };

    // Screen reader and keyboard users land on the confirmation, not on the top of the page
    const showSuccess = () => {
        formContainer.hidden = true;
        successContainer.hidden = false;
        successTitle.focus();
    };

    const showError = (message) => {
        errorDiv.textContent = message;
        errorDiv.hidden = false;
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;

        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
        }
    };

    const sendMessage = async () => {
        const response = await fetch('https://diamond-contact-backend.diamond-helpdesk.workers.dev/', {
            method: 'POST',
            body: new FormData(form)
        });
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong.');
        }
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        showSending();

        try {
            await sendMessage();
            showSuccess();
        } catch (err) {
            showError(err.message);
        }
    });
}
