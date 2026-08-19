"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RefreshCw, Globe } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";

const ShippingReturns = () => {
  return (
    <main className="min-h-screen bg-[#FDFBF9]">
      <Navbar />

      <PageBanner
        title="Shipping & Returns"
        subtitle="Client Services"
        image="/images/optimized/banner (5).png"
          height="h-[75vh]"
      />

      {/* Policy Sections */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid  gap-20">

          {/* Shipping Policy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">1.Shipping Policy</h2>
              </div>
              <div className="space-y-6 text-sm text-foreground/70 leading-loose">
                <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
                  <li>
                    MaiRii ships PAN India. We have partnered with best logistics services to ensure that your products are handled professionally and delivered on time.
                  </li>

                  <li>
                    MaiRii offers free shipping for all prepaid orders above ₹1499 within India. Shipping charges/Cash-handling charge of ₹199 is applicable for all Partial COD orders and orders less than ₹1499 within India.
                  </li>
                </ul>
                {/* <p>
                  <strong className="text-foreground font-semibold">Delivery Partners:</strong> We partner with premium 
                  courier services specializing in high-value shipments to ensure 
                  secure and timely delivery to your doorstep.
                </p> */}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">2.Order Dispatch</h2>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>
                  MaiRii orders are usually processed and dispatched within 2-3 working days.You will be intimated about the tracking details of your order once your order is shipped.In case of any unforseen circumstances or rare operational delays in processing your order, we will intimate you and inform you regarding possible delays.
                </li>

                <li>
                  Delivery will typically take 3-4 days after dispatch, depending on the shipping location.
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">3.Returns & Exchanges</h2>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>
                  If you are not satisfied with your order, we offer a hassle-free 5 days to return it for a refund or product exchange from the date of delivery.
                </li>

                <li>
                  Customised orders and items on sale are not eligible for exchange.
                </li>
                <li>Promotional offers cannot be applied to Exchange orders/Credit Notes.</li>
                <li>Items must be unused, unworn, and have all original tags attached and packaging intact.Items that are damaged or altered once the tags are removed, may not be accepted and will be sent back to the customer. </li>
                <li>We offer a replacement/refund only for product/s which is/ are damaged /broken, missing or significantly different from website description.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">4.Exchange Eligibility</h2>
              </div>
              <div className="space-y-6 text-sm text-foreground/70 leading-loose">
                <ul className="mt-5 list-disc space-y-3 pl-6 text-muted-foreground">
                  <li>
                    MaiRii accepts Exchanges ONLY if:
                  </li>

                  <li>
                    The product(s) delivered is different from the original order.
                  </li>
                  <li>The product(s) delivered arrived damaged.</li>
                  <li>The product has missing parts.</li>
                  <li>In case of significantly different, the product/s must be in an absolutely unworn and brand new condition and must be returned with the original sealed box, invoice, tags, instruction papers, warranty and other accessories if any. Make sure you have not used the product. Scratched and Used Products will not be taken back.</li>
                  <li>You can exchange an item purchased with the same item or another one, however, all exchanges are subject to stock availability.</li>
                  <li>In case of exchange, the customer will have to pay the difference between the new product chosen and the valuation of the old product before dispatch.</li>
                  <li>All loss or damage while return from you is your responsibility. We will not be liable for any such incidents. For all self-shipped returns, we recommend you use a reliable courier service.</li>
                </ul>
                {/* <p>
                  <strong className="text-foreground font-semibold">Delivery Partners:</strong> We partner with premium 
                  courier services specializing in high-value shipments to ensure 
                  secure and timely delivery to your doorstep.
                </p> */}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">5.Process of Return/Exchange</h2>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>
                  To process a return/exchange, please follow these simple steps:
                </li>

                <li>
                  You need to share the order number,name with images of the products with packaging and tags intact via email at connectconnect@mairiijewels.com within 24 hours from the time you receive your product.Our team will review your request and advise on the further steps.
                </li>
                <li>Once you receive our confirmation for your return request approval, you need to ship us the products you wish to return with all the original packaging by keeping it safely back into the box/packaging. The product(s) should be shipped back to us within 5 days from the day we approve your return  request. The cost of shipping the product will be borne by the customer. The product(s) should be in its original and unused condition with intact packaging. We will not be able to process the refund credit if the product(s) is damaged or shipped without its original packaging. Please use a reliable courier service for shipping the product(s) and share the tracking details once the products shipped.</li>
                <li>When we receive the returned item, it will inspected to ensure everything is present and in it’s in original condition and then issue either a refund or a different item in exchange, as per your request. </li>
                <li>If you return any order delivered to you, original shipping charges (if any) will not be refunded.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">6.Cancellation Of Order</h2>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>
                  To ensure our team can process and ship orders as fast as possible, we do not offer cancellations once an order is placed. We encourage you to double-check your cart to make sure you’re 100% in love before hitting checkout!
                </li>

                <li>
                  We reserve the right to cancel an order in case the order request is not acceptable to us. Upon such cancellation, we will give you full refund. Any such cancellation shall be at the sole discretion of MaiRii and you will have no right to contest the same. The reasons for cancellation could be due to non-availability of the Product/s, inaccuracy in Product or pricing information or due to reasons of any fraud or wrong usage of payment mechanism adopted by you. Any cancellation will be intimated to you by us over phone or mail.
                </li>
                <li>If the order is cancelled by us,we will provide you full refund including shipping charges.</li>
                <li>For any further queries regarding cancellation/refunds, please <span className="font-bold">email us at : connectconnect@mairiijewels.com</span> </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">7.Refund Policy</h2>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>
                  We offer a refund within 10 Days of requesting for the return subject to the process being followed.
                </li>

                <li>
                  Refund will be issued as a credit in the form of coupon code only. The coupon code is a one-time use code and cannot be applied again to any other order. The coupon code has a 3 month validity from the date of issuance and can be used any time within the 3 month period for your purchase.
                </li>
                <li>Coupon code will be processed within 3 working days from the day we receives the returned products or the confirmation of cancellation of the orders. </li>
                <li>The coupon code issued as refund will only be applicable for use if you do not apply any other offer code while placing a new order. </li>
                <li>A customer cannot apply more than one coupon code while placing an order and hence orders that are placed using the refund coupon code will not be able to apply any offer coupon code.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">8.Application Deductions</h2>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>Total of ₹240 towards the non-acceptance of prepaid orders will be deducted towards the forward and reverse shipment of the order being shipped back to our warehouse. The balance amount will be shared in the form of a refund coupon code via email. No bank transfer/credit to source will be provided for packages undelivered & returned. </li>
                <li>Any refund coupon code of the previous order, if applied to a new order which is not accepted by your, will lead to expiry of the coupon code and cannot be used again. Please ensure COD / prepaid orders placed using coupon codes are accepted by you.</li>
                <li>For any online prepaid transactions, where the amount is deducted from your card/wallet and the order confirmation is not received, please contact us before you place another order. We will confirm if your transaction was captured. In case of a new order placed before confirming with us, 5% towards the payment gateway charges will be deducted from the transaction amount before refund.</li>
                <li>For orders where the shipping charges were waived off as part of any offer, ₹140 towards the shipping from our warehouse to the customer will be deducted while processing refund coupon codes. </li>
                <li>A customer, who has used a refund code to place an order, returns the order, will only be eligible for a maximum of 2 refund codes tracing back to the original order. </li>
                <li>Free shipping offer applied to orders placed with refund coupon codes will be deducted (charges worth ₹140) in case the customer has placed more than 2 orders using a refund coupon code.</li>
                <li>TOKEN AMOUNT REFUND - Token amount cannot be refunded in case the Cash on delivery order is not accepted or is cancelled by the customer / returns back to our warehouse due to any reason. (₹240 as per standard deduction for the 'to & fro' journey of the package)</li>
                <li>In case the token amount paid for the COD order is of more than ₹240, the excessive amount will be refunded in the form of a refund coupon code as per the policy and will be emailed to the customer. </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">9.Inspection Of Returns</h2>
              </div>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>Items which are not informed for returns within 24 hours / not received by us within 5 days, are not eligible for returns. </li>
                <li>All our products undergo multiple levels of quality checks and sent. In case of quality not meeting your expectation, no money refund will be given. </li>
                <li>Return / Exchange request are subject to verification and checks to determine the legitimacy of return/replacement request by the respective Seller(s) and Return / Exchange and / or Refund shall be refused in case of the following cases:</li>
              </ul>
              <ul className="mt-5 space-y-3 pl-10 text-foreground/60">
                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  If it is determined that product is damaged while in your possession;
                </li>

                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  Any product that has been used or washed or soiled or is returned without non-tampered quality check seals/ warranty seals (wherever applicable);
                </li>

                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  Any product not in its original condition;
                </li>
                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  Any product that is returned without its original packaging tags and accessories, including the retail box and all other items originally included with the product at the time of delivery;
                </li>
                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  Any product without a valid and readable serial number, including but not limited to products with missing, damaged, altered, tampered, or otherwise unreadable serial number;
                </li>
                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  The product is different from what was shipped to you;
                </li>
                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  Product sold as combo/ sets cannot be replaced or returned individually.
                </li>
                <li className="relative pl-5">
                  <span className="absolute left-0 top-0 text-primary">→</span>
                  Product specified as non-returnable in the product details page.
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">10.Damaged Products</h2>
              </div>
              <p className="text-foreground/60">All our products go through a thorough 'Quality Check' and are packed with utmost care to ensure it reaches our customers in the most delightful condition. But in some rare cases, it may happen that due to rough handling of the package during transit by the courier partner, the product may not reach you in the condition you expected it to be. In such cases, below is what you need to do:</p>
              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>Inform within 24 Hours: Create a video of unboxing your package, or click pictures of the product to that clearly shows the issues you are facing. Write an email within 24 hours of receiving the package to our returns support team at connectconnect@mairiijewels.com and attach all the necessary proofs for faster resolution. Our team will respond to your mail within 48 hours. </li>
                <li> Reverse Pickup: Once your return is approved and our team verifies that your order is eligible for a return and replacement, we will arrange a reverse pickup for your product at no extra cost, and the same will be attempted within 24 hours after confirmation. We will request you to keep the products ready for pickup, failure to do so we lead to cancellation of pickup and you will have to ship the product back to us by bearing the shipping charges. </li>
                <li> Resolution: Once the reverse pickup is successful, we will dispatch a replacement package for your damaged product depending upon the availability of the same or shall issue you a full refund coupon code worth the value of the product for your next purchase which will be valid for the next 3 months from the date of issuance. No refund will be provided in any replacement or damage cases. We will be happy to provide you a replacement or issue a refund coupon code.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">11.Packaging</h2>
              </div>

              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>We ship our products in corrugated boxes which thickness apt enough for it to be delivered worldwide with the products intact. </li>
                <li>The jewellery inside is wrapped in zip pouches which makes sure that the jewellery is safe from any direct contact from liquid, chemicals or gases which the package may come in contact during its transit. </li>
                <li>We recommend you to store the jewellery in the same pouches or similar pouches to ensure longevity and look of the jewellery. </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">12.COD</h2>
              </div>

              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>COD is available for all orders.</li>
                <li>For COD orders, we collect a INR 140 deposit upfront. Please note that if a parcel is returned to us due to non-availability or refusal at the door, deposit (INR 140) is non-refundable to cover the two-way shipping costs incurred.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">13.Non Availability Of Receiver</h2>
              </div>

              <p className="text-foreground/60">In case of parcel being returned due to non-availability / non reachability of the customer, We charge the usual shipping charges for re-shipping the parcel, applicable to all cases.</p>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">14.Lost Shipments</h2>
              </div>

              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>In case of a lost shipment, a replacement or credit note will be offered after a thorough check with the courier partner. </li>
                <li>Lost shipments may take longer than usual to resolve (within 10 business days), depending on the time taken by the courier partner.</li>
                <li>If the package is marked as "delivered" but not received, customers must raise a complaint at  <strong>connectconnect@mairiijewels.com </strong>within 24 hours for us to initiate the inspection immediately.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-center space-x-4 mb-6">
                {/* <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-champagne" />
                </div> */}
                <h2 className="text-2xl font-serif tracking-wide">15.MISC</h2>
              </div>

              <ul className="mt-5 list-disc space-y-3 pl-6  text-foreground/60">
                <li>Customers are advised to open the box and check for manufacturing defects if any and choose not to accept the order in such a case.</li>
                <li>MaiRii reserves the right to make changes in the terms and conditions without any prior notice to the customer</li>
                <li>If your package cannot be delivered due to an incorrect address, you'll be responsible for any extra charges incurred to correct the address or return the package.</li>
                <li>Once the order is confirmed the price mentioned in the invoice by the seller will be the final price and it will be inclusive of taxes and shipment.
                </li>
                <li>For products received damaged, we will be happy to ship a replacement for the same product or issue you a refund coupon code for the amount paid for the product. </li>
              </ul>
            </div>
          </motion.div>

          {/* Returns Policy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >


          </motion.div>

        </div>
      </section>

      {/* Support CTA */}
      <section className="py-20 bg-foreground text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-serif mb-6">Need Further Assistance?</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
            Our concierge team is available to assist you with any questions
            regarding your shipment or return request.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="mailto:conciergeconnectconnect@mairiijewels.com" className="px-8 py-3 bg-champagne text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-foreground transition-all duration-300">
              Email Support
            </a>
            <a href="tel:+919876543210" className="px-8 py-3 border border-white/20 text-white text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-foreground transition-all duration-300">
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ShippingReturns;
