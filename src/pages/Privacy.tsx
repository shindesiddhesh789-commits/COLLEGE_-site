import React from 'react';

export default function Privacy() {
  return (
    <div className="bg-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-dark-secondary mb-8">Last Updated: June 1, 2026<br/>Estimated Reading Time: 5 minutes</p>

        <div className="space-y-8 text-dark-secondary leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">1. Introduction</h2>
            <p>XelCo InfraTechnologies Pvt. Ltd. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our smartBins, mobile applications, or any of our B2B/B2G software platforms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">2. Information We Collect</h2>
            <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Personal Data:</strong> Name, professional email, phone number, and organization details when you contact us or request a demo.</li>
                <li><strong>IoT Telemetry Data:</strong> Fill levels, hardware status, and physical interaction metrics from our deployed smartBins. <span className="font-semibold text-dark">Note: We do not collect personally identifiable information from individual municipal citizens using public bins.</span></li>
                <li><strong>Usage Data:</strong> Application telemetry, dashboard logins, and user preferences within our ESG reporting software.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">3. How We Use Information</h2>
            <p>We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>To provide, maintain, and monitor our hardware and software infrastructure.</li>
              <li>To generate aggregated, anonymized ESG and sustainability reports.</li>
              <li>To dispatch predictive maintenance alerts and optimize collection routes.</li>
              <li>To respond to your inquiries and support requests.</li>
            </ul>
          </section>

          <section>
             <h2 className="text-2xl font-semibold text-dark mb-4">4. Data Security</h2>
             <p>We implement robust, enterprise-grade security measures, including AES-256 encryption at rest and TLS for data in transit. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact our Data Protection Officer at:</p>
            <p className="font-medium text-dark mt-2">privacy@xelcoinfra.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
