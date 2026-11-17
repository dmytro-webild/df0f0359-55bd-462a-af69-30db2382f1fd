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
          label="OFFICIAL TRUCK MEET 2026"
          title="EXCLUSIVE SLIDING"
          description="High horsepower custom builds, show & shine showcases, and tire-smoking drift action. Experience the ultimate truck event."
          primaryButton={{
            text: "Get Tickets",
            href: "#tickets"
          }}
          secondaryButton={{
            text: "Ticket Tiers",
            href: "#tickets"
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
                "Spectator trackside viewing access",
                "",
                "Event decal & sticker pack"
              ],
              cta: {
                text: "Select $20 Pass",
                href: "#contact"
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
                "Access  to vendors",
                "Full paddock & pit lane access"
              ],
              cta: {
                text: "Select $40 VIP",
                href: "#contact"
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
                href: "#contact"
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
          description="Everything you need to know about spectator tickets, VIP perks, gate times, and parking."
          contactLabel="Need event info?"
          contactTitle="Talk directly with our event coordination crew."
          contactButton={{
            text: "Contact event crew",
            href: "#contact"
          }}
          items={[
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
          label="Reserve Passes"
          title="Secure your Exclusive Sliding ticket"
          description="Select your ticket option to confirm your spot for the upcoming truck meet."
          itemsTitle="Ticket reservation steps"
          items={[
            "Select your ticket option ($20, $40, or $80 VIP)",
            "Receive digital pass confirmation via email",
            "Show confirmation at main gate for wristband entry"
          ]}
          note="Limited VIP passes available"
          topics={[
            "$20 Show & Shine Pass",
            "$40 VIP Pass",
            "$80 VIP All-Access Pass"
          ]}
          submitText="Reserve Ticket Now"
          labels={{
            name: "Full name",
            role: "Attendee type",
            phone: "Phone number",
            email: "Email address",
            company: "Vehicle / Team name (optional)",
            topic: "Select ticket option"
          }}
          successText="Thank you! Your ticket reservation has been received. Check your email for pass details."
          placeholders={{
            name: "",
            role: "",
            phone: "",
            email: "",
            company: "",
            topic: ""
          }}
        />
      </div>
    </>
  );
}
