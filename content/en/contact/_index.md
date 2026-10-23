---
title: Contact us
seo:
  description: Contact DIAMOND for platform support, container assistance, documentation
    questions, and materials data coordination.
---

<div id="contact-form-container">
<div id="contact-form-error" class="alert alert-danger d-none" role="alert"></div>
<form id="contact-helpdesk-form">
<div class="mb-3">
<label for="contact-name" class="form-label fw-semibold">Name</label>
<input type="text" class="form-control" id="contact-name" name="name" required>
</div>
<div class="mb-3">
<label for="contact-email" class="form-label fw-semibold">Email</label>
<input type="email" class="form-control" id="contact-email" name="email" required>
</div>
<div class="mb-3">
<label for="contact-message" class="form-label fw-semibold">Message</label>
<textarea class="form-control" id="contact-message" name="message" required rows="4" placeholder="Please describe your question or issue…"></textarea>
</div>
<div class="mb-3 p-3 bg-body-tertiary rounded border">
<div class="form-check">
<input class="form-check-input" type="checkbox" id="gdpr-consent" name="gdpr_consent" required>
<label class="form-check-label" for="gdpr-consent">
I consent to the processing of my personal data (name and email) to handle my inquiry.
This form uses Cloudflare Turnstile for spam protection, which analyzes technical browser data and may use cookies to verify you are human.
</label>
</div>
</div>
<div class="cf-turnstile d-flex justify-content-center mb-3" data-sitekey="0x4AAAAAADrVIyJ51RUnlL-u" data-language="en"></div>
<button type="submit" id="contact-submit-btn" class="btn btn-primary w-100" data-sending="Sending…">
Submit Enquiry
</button>
</form>
</div>
<div id="contact-success-container" class="d-none text-center py-4">
<div class="mx-auto d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 mb-3" style="width:4rem;height:4rem;">
<svg class="text-success" width="2rem" height="2rem" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
</svg>
</div>
<h2>Request Received!</h2>
<p class="text-body-secondary mb-4">Thank you for submitting your enquiry. Our team will get back to you shortly.</p>
<a href="/en/contact/" class="btn btn-primary">Submit Another Request</a>
</div>
