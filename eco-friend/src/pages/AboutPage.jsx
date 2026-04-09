import AppLayout from "../components/layout/AppLayout";

function AboutPage() {
  return (
    <AppLayout>
      <section className="info-page">
        <div className="info-page-hero">
          <p className="section-eyebrow">About Eco-Friend</p>
          <h1>Reliable clean energy products for everyday life</h1>
          <p className="info-page-lead">
            Eco-Friend is focused on making practical solar and backup power
            solutions more accessible for homes, businesses, and people who want
            dependable energy products they can trust.
          </p>
        </div>

        <div className="info-page-grid">
          <div className="info-page-card">
            <h2>Who We Are</h2>
            <p>
              We are a clean-energy storefront dedicated to offering solar
              panels, inverters, power stations, and rechargeable essentials
              that support energy independence and better preparedness.
            </p>
          </div>

          <div className="info-page-card">
            <h2>What We Offer</h2>
            <p>
              Our catalog is built around practical energy products for homes,
              offices, and everyday use. We focus on solutions that help people
              stay powered during outages and reduce dependence on unstable
              electricity supply.
            </p>
          </div>

          <div className="info-page-card">
            <h2>Our Mission</h2>
            <p>
              Our mission is to connect customers with dependable energy
              products that improve resilience, convenience, and confidence in
              daily life.
            </p>
          </div>

          <div className="info-page-card">
            <h2>Why Eco-Friend</h2>
            <p>
              We aim to combine practical product selection, a simple shopping
              experience, and a growing range of energy solutions suited to real
              needs.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}

export default AboutPage;