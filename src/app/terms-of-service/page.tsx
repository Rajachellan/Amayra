"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { PageBanner } from "@/components/layout/PageBanner";

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <PageBanner 
        title="Terms of Service"
        subtitle="Legal"
        image="/images/banner1.jpg"
        height="h-[65vh]"
      />

      <section className="pb-24 container mx-auto px-6 max-w-4xl pt-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-stone max-w-none space-y-12 text-foreground/80 leading-relaxed"
        >
            <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">Terms & Conditions</h2>
            <p>
             These Terms and Conditions ('Terms') govern your use of the MaiRii website , operated by Gems of Sree Amala LLP, a partnership firm registered in India ('MaiRii', 'we', 'us'). By accessing or using the Platform, you agree to be bound by these Terms.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">1. Eligibility</h2>
            <p>
              You must be at least 18 years of age, or using the Platform under the supervision of a parent or legal guardian, to place an order with us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">2. Account Registration</h2>
            <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Please notify us immediately of any unauthorised use.
            </p>
          
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">3. Product Information & Pricing</h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
    <li>
    We make every effort to display accurate product images, descriptions, and prices. Colours may vary slightly due to screen settings and photography.
    </li>

    <li>
All prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.
    </li>
    <li>In case of a pricing or listing error, we reserve the right to cancel the order and issue a full refund</li>
  </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">4.Order Acceptance & Cancellation</h2>
            <p>
          An order is confirmed only once payment is received and we send an order confirmation. MaiRii reserves the right to cancel any order due to stock unavailability, suspected fraud, pricing errors, or violation of these Terms, with a full refund issued in such cases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">5.Intellectual Property</h2>
            <p>
             All content on the Platform — including but not limited to the MaiRii name, logo, designs, photography, and brand messaging — is the intellectual property of Gems of Sree Amala LLP. No content may be copied, reproduced, or used commercially without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">6. User Conduct</h2>
            <p>
             You agree not to misuse the Platform, including attempting unauthorised access, uploading harmful code, or engaging in fraudulent transactions.
            </p>
          </section>
  <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">7. Third-Party Links</h2>
            <p>
         The Platform may contain links to third-party websites. We are not responsible for the content, policies, or practices of these external sites.
            </p>
          </section>
            <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">8.Limitation Of Liability</h2>
            <p>
        To the extent permitted by law, MaiRii shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Platform or products purchased through it.
            </p>
          </section>
            <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">9. Indemnity</h2>
            <p>
      You agree to indemnify and hold MaiRii harmless from any claims arising out of your breach of these Terms or misuse of the Platform.
            </p>
          </section>
            <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">10. Governing Law & Jurisdiction</h2>
            <p>
        These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts at [City, State].
            </p>
          </section>
            <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">11. Amendments</h2>
            <p>
        We may update these Terms from time to time. Continued use of the Platform after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>
            <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">12. Contact Us</h2>
            <div className="pt-12  text-sm italic">
           For any questions about these Terms, write to us at connect <a href="mailto:connect@mairiijewels.com" className="text-champagne underline">connect@mairiijewels.com</a>.
          </div>
          </section>
          {/* <div className="pt-12 border-t border-foreground/10 text-sm italic">
            If you have any questions about these Terms, please contact us at <a href="mailto:legal@Mairii.com" className="text-champagne underline">legal@Mairii.com</a>.
          </div> */}
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsOfService;
