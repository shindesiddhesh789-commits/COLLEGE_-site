import React from 'react';

export default function Terms() {
  return (
    <div className="bg-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="text-dark-secondary mb-8">Last Updated: June 1, 2026</p>

        <div className="space-y-8 text-dark-secondary leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the website, hardware endpoints, APIs, or SaaS dashboards provided by XelCo InfraTechnologies Pvt. Ltd., you agree to be bound by these Terms and Conditions. If you disagree with any part of the terms, you may not access our services.</p>
          </section>

          <section>
             <h2 className="text-2xl font-semibold text-dark mb-4">2. Intellectual Property</h2>
             <p>The Service and its original content, features, hardware designs, firmware, algorithms, and functionality are and will remain the exclusive property of XelCo InfraTechnologies and its licensors. Our trademarks, trade dress, and patents may not be used without prior written consent.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">3. Use Restrictions</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li>Reverse engineer, decompile, or disassemble any smartBin hardware or software.</li>
              <li>Attempt to gain unauthorized access to our cloud infrastructure or APIs.</li>
              <li>Use the Services for any unlawful purpose or in violation of local environmental regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">4. Limitation of Liability</h2>
            <p>In no event shall XelCo InfraTechnologies, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-dark mb-4">5. Contact for Legal Inquiries</h2>
            <p>For any legal inquiries regarding these Terms, contact us at:</p>
            <p className="font-medium text-dark mt-2">legal@xelcoinfra.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
