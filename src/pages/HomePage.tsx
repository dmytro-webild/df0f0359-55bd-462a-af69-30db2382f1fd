import HeroParticleTruck from "@/components/sections/hero/HeroParticleTruck";
import FaqLimeAccordion from "@/components/sections/faq/FaqLimeAccordion";
import HomeTicketsSection from "@/components/sections/tickets/HomeTicketsSection";
import HomeMerchSection from "@/components/sections/merch/HomeMerchSection";
import MovingClouds3D from "@/components/kit/MovingClouds3D";

export default function HomePage() {
  return (
    <>
      <div
        id="home"
        data-webild-section="HeroParticleTruck"
        data-webild-section-id="HeroParticleTruck-1"
        data-section="home"
        className="relative overflow-hidden"
      >
        <MovingClouds3D className="z-[2] opacity-80" />
        <HeroParticleTruck
          label="CREW PHONE: 812-800-8244 | CASH APP & CARDS ACCEPTED"
          title="EXCLUSIVE SLIDING"
          description="if your looking for custom builds, show & shine showcases,burn outs, vip, vendors, then this is the show for you!"
          primaryButton={{
            text: "Get Tickets",
            href: "#tickets"
          }}
          secondaryButton={{
            text: "Call Crew: 812-800-8244",
            href: "tel:8128008244"
          }}
          introDelay={0.1}
        />
      </div>

      <div
        id="tickets"
        data-webild-section="HomeTicketsSection"
        data-webild-section-id="HomeTicketsSection-1"
        data-section="tickets"
      >
        <HomeTicketsSection />
      </div>

      <div
        id="merch"
        data-webild-section="HomeMerchSection"
        data-webild-section-id="HomeMerchSection-1"
        data-section="merch"
      >
        <HomeMerchSection />
      </div>

      <div
        id="faq"
        data-webild-section="FaqLimeAccordion"
        data-webild-section-id="FaqLimeAccordion-1"
        data-section="faq"
      >
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
              title: "Can I reserve my ticket online and pay at the gate?",
              description: "Yes! Select 'Reserve & Pay at Gate' in the ticket section. You will get a digital pass code instantly to show at the entrance gate where you can pay cash or card."
            },
            {
              title: "How can I pay for tickets using Cash App or credit card?",
              description: "You can pay for tickets using Cash App ($ExclusiveSliding), Credit/Debit card online, Venmo, Apple Pay, or Cash at the entrance gate. Send payment on Cash App with your full name in the note, or call/text 812-800-8244 for instant confirmation."
            },
            {
              title: "What does the $20 Show & Shine ticket include?",
              description: "The $20 Show & Shine ticket grants you full access to the truck showcase arena, spectator viewing areas, event voting ballot, and general parking."
            },
            {
              title: "What is included with the $40 VIP ticket?",
              description: "The $40 VIP ticket includes fast-track gate entry, access to the reserved trackside VIP lounge, full paddock/pit access, and an official event lanyard & decal pack."
            },
            {
              title: "What extra perks come with the $80 Vendor pass?",
              description: "The $80 Vendor pass includes exclusive vendor booth placement, full trackside paddock access, passenger hot-lap ride-along experience, and garage staging access."
            },
            {
              title: "When do gates open for spectators and vehicles?",
              description: "Gates open Saturday from 8:00 AM to 10:00 PM. VIP pass holders and Show & Shine entries receive priority gate access."
            }
          ]}
        />
      </div>
    </>
  );
}
