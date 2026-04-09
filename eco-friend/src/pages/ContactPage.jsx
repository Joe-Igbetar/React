import AppLayout from "../components/layout/AppLayout";

function ContactPage() {
  return (
    <AppLayout>
      <section className="info-page">
        <div className="info-page-hero">
          <p className="section-eyebrow">Contact Us</p>
          <h1>We are here to help</h1>
          <p className="info-page-lead">
            Reach out to us for product questions, support, and general
            enquiries. We would be glad to assist you.
          </p>
        </div>

        <div className="contact-grid">
          <div className="info-page-card">
            <h2>Contact Information</h2>
            <p><strong>Email:</strong> support@ecofriend.com</p>
            <p><strong>Phone:</strong> +234 903 728 3779</p>
            <p><strong>Address:</strong> Abuja, Nigeria</p>
          </div>

          <div className="info-page-card">
            <h2>WhatsApp</h2>
            <p>
              Chat with us directly on WhatsApp for faster support and product
              enquiries.
            </p>

            <a
              href="https://wa.me/2349037283779"
              target="_blank"
              rel="noreferrer"
              className="contact-whatsapp-btn"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="info-page-card">
            <h2>Support Hours</h2>
            <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
            <p>Saturday: 10:00 AM – 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export default ContactPage;