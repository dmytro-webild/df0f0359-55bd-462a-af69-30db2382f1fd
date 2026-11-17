import HeroParticleTruck from "@/components/sections/hero/HeroParticleTruck";
import AboutCentredStatementLogos from "@/components/sections/about/AboutCentredStatementLogos";
import PricingTierCards from "@/components/sections/pricing/PricingTierCards";
import GalleryParticleYard from "@/components/sections/gallery/GalleryParticleYard";
import TestimonialParticleRoad from "@/components/sections/testimonial/TestimonialParticleRoad";
import FaqLimeAccordion from "@/components/sections/faq/FaqLimeAccordion";
import ContactDarkFormCardTerminal from "@/components/sections/contact/ContactDarkFormCardTerminal";
import ParticleYardStage from "@/components/kit/ParticleYardStage";
import LoaderNotchSplit from "@/components/loaders/LoaderNotchSplit";

export default function HomePage() {
  return (
    <>
      <ParticleYardStage
        introDelay={2.1}
        variant="auto"
      />

      <LoaderNotchSplit
        brand="Exclusive Sliding"
      />

      <div id="home" data-webild-section="HeroParticleTruck" data-webild-section-id="HeroParticleTruck-1" data-section="home" data-scene>
        <HeroParticleTruck
          label="Performance Truck Meet"
          title="High horsepower meets sideways action"
          description="Exclusive Sliding brings together high-output custom builds, drift trucks, and track drivers for pure adrenaline and precision control."
          primaryButton={{
            text: "Register to drive",
            href: "#contact"
          }}
          secondaryButton={{
            text: "Explore trucks",
            href: "#pricing"
          }}
          introDelay={2.1}
        />
      </div>

      <div id="about" data-webild-section="AboutCentredStatementLogos" data-webild-section-id="AboutCentredStatementLogos-1" data-section="about">
        <AboutCentredStatementLogos
          label="About The Meet"
          title="We unite aggressive trucks for an experience built purely around control, smoke, and sliding."
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

      <div id="pricing" data-webild-section="PricingTierCards" data-webild-section-id="PricingTierCards-1" data-section="pricing" data-gallery>
        <PricingTierCards
          title="Built for the paddock and the track"
          items={[
            {
              label: "Street Spec",
              title: "Engine & Angle Specs",
              description: "High-output engine bays paired with custom steering angle kits for controlled tarmac entry and continuous high revs.",
              features: [
                "High-output twin-turbo V8 setups",
                "Custom steering angle kits",
                "Trackside inspection prep"
              ],
              imageSrc: "https://img.b2bpic.net/free-photo/mechanic-examining-car_1170-1330.jpg",
              imageAlt: "Mechanic examining a car",
              cta: {
                text: "Register Driver",
                href: "#contact"
              }
            },
            {
              label: "Pro Drift",
              title: "Full Chassis Prep",
              description: "Reinforced drift chassis built for high-angle slides, cage-reinforced cockpits, and full night drift lighting design.",
              features: [
                "Full roll cage reinforcement",
                "Adjustable coilovers and angle kits",
                "Custom LED night drift setups"
              ],
              imageSrc: "https://img.b2bpic.net/free-photo/female-mechanic-repairing-car_1170-1409.jpg",
              imageAlt: "Female mechanic repairing a car",
              cta: {
                text: "Register Driver",
                href: "#contact"
              }
            },
            {
              label: "Unrestricted",
              title: "Supercharged Builds",
              description: "Unrestricted performance builds pushing 900hp with long-travel suspension engineered for high impact asphalt drift runs.",
              features: [
                "Max horsepower up to 900hp",
                "Long-travel suspension setup",
                "Trackside shredded rubber testing"
              ],
              imageSrc: "https://img.b2bpic.net/free-photo/bohemian-personalities-going-adventure-together_23-2149623204.jpg",
              imageAlt: "Bohemian personalities going on adventure together",
              cta: {
                text: "Join Paddock",
                href: "#contact"
              }
            }
          ]}
        />
      </div>

      <div id="work" data-webild-section="GalleryParticleYard" data-webild-section-id="GalleryParticleYard-1" data-section="work">
        <GalleryParticleYard
          label="The Impact"
          title="Proven on the pavement"
          description="Numbers built across seasons of sideways runs."
          items={[
            {
              value: 120,
              suffix: "+",
              label: "Active drivers"
            },
            {
              value: 45,
              label: "Trophies awarded"
            },
            {
              value: 900,
              suffix: "hp",
              label: "Max horsepower"
            },
            {
              value: 10,
              suffix: "k+",
              label: "Fans in attendance"
            }
          ]}
        />
      </div>

      <div id="testimonial-particle-road-1" data-webild-section="TestimonialParticleRoad" data-webild-section-id="TestimonialParticleRoad-1" data-section="testimonial-particle-road-1">
        <TestimonialParticleRoad
          label="From the Paddock"
          quote="The track layout lets us slide at full speed with total control. Best truck event of the year."
          name="Hannah Hughes"
          role="Lead Drift Driver"
          company="Hughes Drift Co"
          avatarSrc="https://img.b2bpic.net/free-photo/woman-posing-together-retro-style-inside-car_23-2149525856.jpg"
        />
      </div>

      <div id="faq-lime-accordion-1" data-webild-section="FaqLimeAccordion" data-webild-section-id="FaqLimeAccordion-1" data-section="faq-lime-accordion-1">
        <FaqLimeAccordion
          label="Got Questions?"
          title="Before you arrive"
          description="Everything you need to know about spectator passes, tech checks, and track access."
          contactLabel="Need track info?"
          contactTitle="Talk directly with our event coordination crew."
          contactButton={{
            text: "Contact event crew",
            href: "#contact"
          }}
          items={[
            {
              title: "Can I bring my own truck to slide?",
              description: "Yes. Exclusive Sliding is open to high-performance custom truck builds that pass our mandatory trackside technical inspection."
            },
            {
              title: "What are the driver entry and safety requirements?",
              description: "Reserve entry beforehand. All vehicles must pass safety checks covering battery security, helmet standards, harness mounts, and fluid containment."
            },
            {
              title: "Is drifting experience required for all runs?",
              description: "No. We organize run groups for different skill levels, including dedicated novice drift pits alongside high-horsepower pro tandems."
            },
            {
              title: "When do gates open for spectators and drivers?",
              description: "Gates open Saturday from 8:00 AM to 10:00 PM at 742 Irwindale Ave. Drivers should arrive early for tech inspection."
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactDarkFormCardTerminal" data-webild-section-id="ContactDarkFormCardTerminal-1" data-section="contact">
        <ContactDarkFormCardTerminal
          label="Get Involved"
          title="Secure your spot on the grid"
          description="Ready to hit the tarmac for the upcoming performance truck meet in Irwindale."
          itemsTitle="Registration process"
          items={[
            "Select driver or spectator registration",
            "Receive paddock access details via email",
            "Check in at Irwindale Ave entrance"
          ]}
          note="Limited paddock spots available"
          topics={[
            "Pro Driver Registration",
            "Spectator Pass",
            "Paddock VIP Access",
            "Media & Press Pass"
          ]}
          submitText="Register now"
          labels={{
            name: "Full name",
            role: "Driver or spectator",
            phone: "Phone number",
            email: "Email address",
            company: "Team or build name",
            topic: "Registration category"
          }}
          successText="Thank you! We will confirm your registration details via email shortly."
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
