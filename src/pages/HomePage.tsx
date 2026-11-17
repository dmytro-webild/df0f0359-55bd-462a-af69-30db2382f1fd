import HeroParticleTruck from "@/components/sections/hero/HeroParticleTruck";
import AboutCentredStatementLogos from "@/components/sections/about/AboutCentredStatementLogos";
import PricingTierCards from "@/components/sections/pricing/PricingTierCards";
import FaqLimeAccordion from "@/components/sections/faq/FaqLimeAccordion";
import ContactDarkFormCardTerminal from "@/components/sections/contact/ContactDarkFormCardTerminal";

export default function HomePage() {
  return (
    <>
      <div id="home" data-webild-section="HeroParticleTruck" data-webild-section-id="HeroParticleTruck-1" data-section="home">
        <HeroParticleTruck
          label="CREW PHONE: 812-800-8244 | CASH APP & CARDS ACCEPTED"
          title="EXCLUSIVE SLIDING"
          description="if your looking for custom builds, show & shine showcases,burn outs, vip, vendors, then this is the show for you!"
          primaryButton={{
            text: "Get Tickets",
            href: "/tickets"
          }}
          secondaryButton={{
            text: "Call Crew: 812-800-8244",
            href: "tel:8128008244"
          }}
          introDelay={0.1}
        />
      </div>

      <div id="tickets" data-webild-section="PricingTierCards" data-webild-section-id="PricingTierCards-1" data-section="tickets">
        <PricingTierCards
          title="TICKET OPTIONS"
          items={[
            {
              label: "Show & Shine Pass",
              title: "Show & Shine",
              price: "$20",
              period: "per pass",
              description: "General admission pass including Show & Shine vehicle display entry, voting access, and spectator grounds.",
              features: [
                "Show & Shine Arena entry",
                "Show and shine parking",
                "Access to vendors",
                "Pay via Cash App ($ExclusiveSliding), Card, or Cash"
              ],
              cta: {
                text: "Select $20 Pass",
                href: "/tickets"
              }
            },
            {
              label: "VIP Pass",
              title: "VIP",
              price: "$40",
              period: "per pass",
              description: "VIP spectator pass featuring reserved trackside lounge access, exclusive merch pack, and priority gate entry.",
              features: [
                "Priority VIP gate entrance",
                "Reserved front row parking spot",
                "Access to vendors",
                "Full paddock & pit lane access"
              ],
              cta: {
                text: "Select $40 VIP",
                href: "/tickets"
              }
            },
            {
              label: "VIP All-Access",
              title: "VIP",
              price: "$80",
              period: "per pass",
              description: "Ultimate VIP pass with passenger hot lap ride-along experience, garage bay access, and driver meet-and-greet.",
              features: [
                "Exclusive vendor booth",
                "Passenger hot lap / ride-along pass",
                "Exclusive garage & staging access",
                "Driver meet & greet + VIP photo pass"
              ],
              cta: {
                text: "Select $80 VIP",
                href: "/tickets"
              }
            }
          ]}
        />
      </div>

      <div id="about" data-webild-section="AboutCentredStatementLogos" data-webild-section-id="AboutCentredStatementLogos-1" data-section="about">
        <AboutCentredStatementLogos
          label="About The Meet"
          title="Uniting custom truck builds, tire smoke, and high-angle control on the tarmac."
          items={[
            {
              name: "Apex Performance"
            },
            {
              name: "Torque Supply"
            },
            {
              name: "Burnout Tech"
            },
            {
              name: "Drift Spec"
            },
            {
              name: "Overboost Co"
            }
          ]}
        />
      </div>

      <div id="faq" data-webild-section="FaqLimeAccordion" data-webild-section-id="FaqLimeAccordion-1" data-section="faq">
        <FaqLimeAccordion
          label="Got Questions?"
          title="Ticket & Event Information"
          description="Everything you need to know about spectator tickets, VIP perks, gate times, payment methods, and crew contact."
          contactLabel="Need crew or payment info?"
          contactTitle="Talk directly with our event coordination crew at 812-800-8244."
          contactButton={{
            text: "Call / Text Crew: 812-800-8244",
            href: "tel:8128008244"
          }}
          items={[
            {
              title: "How can I pay for tickets using Cash App or other payment methods?",
              description: "You can pay for tickets using Cash App ($ExclusiveSliding), Venmo, Apple Pay, Credit/Debit card, or Cash at the entrance gate. Send payment on Cash App with your full name in the note, or call/text 812-800-8244 for instant confirmation."
            },
            {
              title: "What does the $20 Show & Shine ticket include?",
              description: "The $20 Show & Shine ticket grants you full access to the truck showcase arena, spectator viewing areas, event voting ballot, and general parking."
            },
            {
              title: "What is included with the $40 VIP ticket?",
              description: "The $40 VIP ticket includes fast-track gate entry, access to the reserved trackside VIP lounge, full paddock/pit access, and an official event t-shirt & lanyard."
            },
            {
              title: "What extra perks come with the $80 VIP ticket?",
              description: "The $80 VIP ticket includes all VIP perks plus a passenger hot-lap ride-along experience, garage staging access, and an exclusive driver meet-and-greet session."
            },
            {
              title: "When do gates open for spectators and vehicles?",
              description: "Gates open Saturday from 8:00 AM to 10:00 PM. VIP pass holders and Show & Shine entries receive priority gate access."
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactDarkFormCardTerminal" data-webild-section-id="ContactDarkFormCardTerminal-1" data-section="contact">
        <ContactDarkFormCardTerminal
          label="CONTACT CREW & PASS RESERVATION"
          title="Call or Text 812-800-8244"
          description="Contact our crew directly at 812-800-8244 or reserve your ticket below. We accept Cash App ($ExclusiveSliding), Venmo, Apple Pay, Cards, and Cash at gate."
          itemsTitle="Crew Contact & Ticket Payment Instructions"
          items={[
            "Direct Crew Line: 812-800-8244 (Call or Text anytime)",
            "Cash App ($ExclusiveSliding) - add full name in payment note",
            "Venmo, Apple Pay & Credit / Debit Cards accepted",
            "Cash accepted at main entrance gate on event day"
          ]}
          note="Crew Available 8:00 AM - 10:00 PM | Call/Text 812-800-8244"
          topics={[
            "$20 Show & Shine Pass (Cash App / Card / Cash)",
            "$40 VIP Pass (Cash App / Card / Cash)",
            "$80 VIP All-Access Pass (Cash App / Card / Cash)"
          ]}
          submitText="Reserve Ticket & Request Payment Info"
          labels={{
            name: "Full name",
            phone: "Phone number",
            email: "Email address",
            company: "Preferred Payment Method (Cash App, Card, Cash)",
            topic: "Select ticket option"
          }}
          successText="Thank you! Reservation received. Text 812-800-8244 or send Cash App to $ExclusiveSliding with your name to confirm instantly."
          placeholders={{
            name: "Your full name",
            phone: "Your phone number",
            email: "you@email.com",
            company: "e.g. Cash App ($Tag), Card, Cash at Gate",
            topic: "Select pass option"
          }}
        />
      </div>
    </>
  );
}
