import { Outlet } from "react-router-dom";
import NavbarGlassPlate from "@/components/navbars/NavbarGlassPlate";
import FooterNotchReveal from "@/components/sections/footer/FooterNotchReveal";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="lime" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarGlassPlate
          brand="Exclusive Sliding"
          navItems={[
            {
              name: "The Meet",
              href: "#about"
            },
            {
              name: "Paddock Tiers",
              href: "#pricing"
            },
            {
              name: "Track Record",
              href: "#work"
            },
            {
              name: "Event Info",
              href: "#faq-lime-accordion-1"
            }
          ]}
          primaryButton={{
            text: "Driver Register",
            href: "#contact"
          }}
          secondaryButton={{
            text: "Schedule",
            href: "#faq-lime-accordion-1"
          }}
        />
      </header>
      <main className="flex-grow" data-button="lime" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterNotchReveal
          brand="Exclusive Sliding"
          note="The premier gathering for performance truck enthusiasts. Experience adrenaline, precision, and high-horsepower sliding action on the tarmac."
          columns={[
            {
              title: "Event",
              links: [
                {
                  text: "Main Track",
                  href: "#home"
                },
                {
                  text: "Truck Tiers",
                  href: "#pricing"
                },
                {
                  text: "Event Stats",
                  href: "#work"
                }
              ]
            },
            {
              title: "Community",
              links: [
                {
                  text: "About Us",
                  href: "#about"
                },
                {
                  text: "Driver Feedback",
                  href: "#testimonial-particle-road-1"
                },
                {
                  text: "Attendee FAQ",
                  href: "#faq-lime-accordion-1"
                },
                {
                  text: "Contact Support",
                  href: "#contact"
                }
              ]
            }
          ]}
          socials={[
            {
              text: "Instagram",
              href: "#"
            },
            {
              text: "Twitter",
              href: "#"
            },
            {
              text: "YouTube",
              href: "#"
            }
          ]}
          copyright="© 2026 Exclusive Sliding. All rights reserved."
          legal="Privacy Policy, Track Safety Rules, Terms of Service"
        />
      </footer>
    </div>
  );
}
