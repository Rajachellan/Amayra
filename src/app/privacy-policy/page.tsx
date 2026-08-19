"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { PageBanner } from "@/components/layout/PageBanner";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageBanner
        title="Privacy Policy"
        subtitle="Legal"
        image="/images/optimized/banner (3).png"
        height="h-[75vh]"
      />

      <section className="pb-24 container mx-auto px-6 max-w-4xl pt-20">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-stone max-w-none space-y-12 text-foreground/80 leading-relaxed"
        >
          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">1. Introduction</h2>
            <p>
              MaiRii values your privacy and appreciate your trust. We understand the importance of maintaining your privacy. This privacy policy describes how we treat user information we collect on www.mairiijewels.com and other offline sources. This privacy policy applies to all our current and former visitors and to our online customers. By visiting and/or using our website, you agree that you understand & agree to this privacy policy.
            </p>
          </section>

          <section>
            <h2 className="mb-6 font-serif text-2xl text-foreground">
              2. Information We Collect
            </h2>

            {/* Points */}
            <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                <span className="font-semibold">Contact details:</span> name, email, phone number, shipping and billing address.
              </li>

              <li>
                <span className="font-semibold">Order details:</span> items purchased, order value, payment method (we do not store full card details).
              </li>

              <li>
                <span className="font-semibold">Account information:</span> login credentials, order history, wishlist.
              </li>

              <li>
                <span className="font-semibold">Technical data:</span> IP address, browser type, device information, and cookies (see Section 4).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">3.How we Use Your Information</h2>

            {/* Points */}
            <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                To process, dispatch, and support your orders.
              </li>

              <li>
                To communicate order updates, offers, and newsletters (you may opt out anytime).
              </li>

              <li>
                To personalise your experience and recommend products.
              </li>

              <li>
                To prevent fraud and comply with legal obligations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">4. Sharing Information</h2>
            <p>
              We share your information only with:
            </p>
            {/* Points */}
            <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                Logistics and courier partners, to deliver your order.
              </li>

              <li>
                Payment gateways, to process transactions securely.
              </li>

              <li>
                Service providers who support our operations (e.g., customer support, analytics), under confidentiality obligations.
              </li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">5. Cookies </h2>
            <p>
              We use cookies and similar technologies to remember your preferences, keep you signed in, and understand how you use our Platform. You can disable cookies in your browser settings, though some features may not work as intended.
            </p>


          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">6. Data Security</h2>
            <p>
              We use industry-standard security measures, including SSL encryption, to protect your information. However, no method of transmission over the internet is 100% secure.
            </p>

          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">7. Data Retention </h2>
            <p>
              We retain your information for as long as necessary to fulfil the purposes outlined in this Policy, or as required by law.
            </p>

          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">8. Your Rights & Choices</h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
              <li>
                You may access, update, or request deletion of your personal information by writing to us.
              </li>

              <li>
                You may opt out of marketing communications at any time via the unsubscribe link or by contacting us.
              </li>
            </ul>

          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">9.Children's Policy</h2>
            <p>
              Our Platform is not directed at children under 18. We do not knowingly collect personal information from minors.
            </p>

          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">10.Changes to this Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The 'Effective Date' above reflects the latest revision.
            </p>


          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">11.Contact Us</h2>
            <p>
              For privacy-related questions or requests, write to us at connectconnect@mairiijewels.com
            </p>

          </section>






          <div className="pt-12 border-t border-foreground/10 text-md italic">
            For any questions regarding this policy, please contact our Data Protection Officer at <a href="mailto:connectconnect@mairiijewels.com" className="text-champagne underline">connectconnect@mairiijewels.com</a>.
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
