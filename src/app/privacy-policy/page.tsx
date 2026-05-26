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
        image="/images/luxury/pexels-ankunijjar-31772511.jpg"
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
            <h2 className="text-2xl font-serif text-foreground mb-6">1. Introduction</h2>
            <p>
              Welcome to Amayra. We respect your privacy and are committed to protecting 
              your personal data. This privacy policy will inform you as to how we look 
              after your personal data when you visit our website (regardless of where 
              you visit it from) and tell you about your privacy rights and how the 
              law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">2. Data We Collect</h2>
            <p>
              Personal data, or personal information, means any information about an 
              individual from which that person can be identified. It does not include 
              data where the identity has been removed (anonymous data).
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li>Identity Data includes first name, last name, and username.</li>
              <li>Contact Data includes billing address, delivery address, email address, and telephone numbers.</li>
              <li>Financial Data includes payment card details.</li>
              <li>Transaction Data includes details about payments to and from you and other details of products you have purchased from us.</li>
              <li>Technical Data includes internet protocol (IP) address, your login data, browser type and version, and time zone setting.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, 
              we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-3 mt-4">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal 
              data from being accidentally lost, used or accessed in an unauthorized 
              way, altered or disclosed. In addition, we limit access to your personal 
              data to those employees, agents, contractors and other third parties who 
              have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-6">5. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws 
              in relation to your personal data, including the right to request access, 
              correction, erasure, restriction, transfer, or to object to processing.
            </p>
          </section>

          <div className="pt-12 border-t border-foreground/10 text-sm italic">
            For any questions regarding this policy, please contact our Data Protection Officer at <a href="mailto:privacy@amayra.com" className="text-champagne underline">privacy@amayra.com</a>.
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
