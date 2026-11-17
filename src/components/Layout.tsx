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
              name: "Home",
              href: "/"
            },
            {
              name: "Online Tickets",
              href: "/tickets"
            },
            {
              name: "Exclusive Merch",
              href: "/merch"
            },
            {
              name: "FAQ",
              href: "/#faq"
            }
          ]}
          primaryButton={{
            text: "Buy Tickets",
            href: "/tickets"
          }}
        />
      </header>
      <main className="flex-grow" data-button="solid" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterNotchReveal
          brand="EXCLUSIVE SLIDING"
          note="The premier truck meet. Custom builds, show & shine competition, VIP paddock passes & official Exclusive Sliding gear. Call/text 812-800-8244 or pay passes via Cash App ($jaydenmilliee07), Cards & Cash."
          columns={[
            {
              title: "Tickets & Gear",
              links: [
                {
                  text: "Online Ticket Portal",
                  href: "/tickets"
                },
                {
                  text: "Show & Shine Pass ($20)",
                  href: "/tickets"
                },
                {
                  text: "VIP Passes ($40 - $80)",
                  href: "/tickets"
                },
                {
                  text: "Exclusive Sliding Merch",
                  href: "/merch"
                }
              ]
            },
            {
              title: "Crew & Support",
              links: [
                {
                  text: "Call/Text Crew (812-800-8244)",
                  href: "tel:8128008244"
                },
                {
                  text: "Cash App ($jaydenmilliee07)",
                  href: "/tickets"
                },
                {
                  text: "Event FAQ",
                  href: "/#faq"
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
