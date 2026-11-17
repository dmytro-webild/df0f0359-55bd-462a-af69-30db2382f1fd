import { Outlet } from "react-router-dom";
import NavbarGlassPlate from "@/components/navbars/NavbarGlassPlate";
import FooterNotchReveal from "@/components/sections/footer/FooterNotchReveal";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="solid" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarGlassPlate
          brand="EXCLUSIVE SLIDING"
          navItems={[
            {
              name: "Tickets",
              href: "#tickets"
            },
            {
              name: "About Meet",
              href: "#about"
            },
            {
              name: "FAQ",
              href: "#faq"
            },
            {
              name: "Contact",
              href: "#contact"
            }
          ]}
          primaryButton={{
            text: "Get Tickets",
            href: "#tickets"
          }}
          secondaryButton={{
            text: "",
            href: "tel:8128008244"
          }}
        />
      </header>
      <main className="flex-grow" data-button="solid" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterNotchReveal
          brand="EXCLUSIVE SLIDING"
          note="The premier truck meet. High-horsepower custom builds, show & shine competition, VIP paddock passes. Call/text 812-800-8244 for info or pay passes via Cash App ($ExclusiveSliding), Cards & Cash."
          columns={[
            {
              title: "Event",
              links: [
                {
                  text: "Ticket Options",
                  href: "#tickets"
                },
                {
                  text: "About The Meet",
                  href: "#about"
                },
                {
                  text: "Event FAQ",
                  href: "#faq"
                }
              ]
            },
            {
              title: "Community",
              links: [
                {
                  text: "Call/Text Crew (812-800-8244)",
                  href: "tel:8128008244"
                },
                {
                  text: "Show & Shine Info",
                  href: "#tickets"
                },
                {
                  text: "VIP Access",
                  href: "#tickets"
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
              text: "TikTok",
              href: "#"
            },
            {
              text: "YouTube",
              href: "#"
            }
          ]}
          copyright="© 2026 EXCLUSIVE SLIDING. All rights reserved."
          legal="Privacy Policy, Event Safety Rules, Terms of Service"
        />
      </footer>
    </div>
  );
}
