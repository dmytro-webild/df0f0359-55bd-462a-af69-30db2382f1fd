import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import TerminalNotch from "@/components/kit/TerminalNotch";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Link = { text: string; href: string };
type Column = { title: string; links: Link[] };

type FooterNotchRevealProps = {
  brand: string;
  logoSrc?: string;
  note?: string;
  columns?: Column[];
  socials?: Link[];
  copyright?: string;
  legal?: string;
  ariaLabel?: string;
  className?: string;
};

const FooterNotchReveal = ({ brand, logoSrc, note, columns = [], socials = [], copyright, legal, ariaLabel, className }: FooterNotchRevealProps) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-35%", "0%"]);

  return (
    <footer ref={ref} aria-label={ariaLabel ?? `${brand} footer`} className={cn("relative z-[2] -mt-[1.25rem] text-deep-foreground lg:-mt-[2.5rem]", className)}>
      <TerminalNotch top={{ from: 1, to: -1 }} className="overflow-hidden bg-deep">
        <motion.div style={reduce ? undefined : ({ y } as MotionStyle)} className="mx-auto w-[var(--container)] pb-[clamp(1.5rem,3vw,2.5rem)] pt-[calc(var(--section-space)+2.5rem)]">
          <div className="grid gap-[clamp(3rem,6vw,4rem)] lg:grid-cols-12 lg:gap-x-[var(--gap)]">
            <div className="flex min-w-0 flex-col items-start gap-[clamp(1.5rem,3vw,2.5rem)] lg:col-span-4">
              <a href="#" className="block max-w-full">
                {logoSrc ? (
                  <Media src={logoSrc} alt={brand} loading="lazy" decoding="async" className="h-[2.4rem] w-auto max-w-[14rem] object-contain" />
                ) : (
                  <p className="text-[length:var(--text-h3)] font-medium leading-none tracking-[-0.03em] [overflow-wrap:anywhere]">{brand}</p>
                )}
              </a>
              {note && <p className="max-w-[18rem] text-pretty text-[length:var(--text-small)] leading-[1.45] text-deep-foreground/70">{note}</p>}
            </div>

            {(columns.length > 0 || socials.length > 0) && (
              <div className="grid min-w-0 grid-cols-2 gap-x-[var(--gap)] gap-y-[clamp(2.5rem,5vw,3rem)] sm:grid-cols-3 lg:col-span-8 lg:col-start-5 xl:col-span-7 xl:col-start-6">
                {columns.map((column, i) => (
                  <nav key={`${i}-${column.title}`} aria-label={column.title} className="min-w-0">
                    <p className="font-mono text-[0.6875rem] font-semibold uppercase leading-none tracking-[var(--label-tracking)]">{column.title}</p>
                    <ul className="mt-[clamp(1.5rem,3vw,2.25rem)] flex flex-col gap-[0.6rem]">
                      {column.links.map((link, j) => (
                        <li key={`${j}-${link.text}`}>
                          <a href={link.href} className="text-[length:var(--text-body-lg)] leading-[1.3] [overflow-wrap:anywhere] transition-colors duration-300 hover:text-accent">
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
                {socials.length > 0 && (
                  <nav aria-label="Social" className="col-span-2 min-w-0 sm:col-span-1">
                    <ul className="flex flex-wrap gap-x-[1.25rem] gap-y-[0.75rem] sm:flex-col">
                      {socials.map((social, i) => (
                        <li key={`${i}-${social.text}`}>
                          <a href={social.href} className="btn-link text-deep-foreground hover:text-accent">
                            {social.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            )}
          </div>

          {(copyright || legal) && (
            <div className="mt-[clamp(4rem,9vw,7rem)] flex flex-col gap-[0.5rem] sm:flex-row sm:items-end sm:justify-between sm:gap-[var(--gap)]">
              {copyright && <p className="text-[length:var(--text-small)] leading-[1.6] text-deep-foreground/60">{copyright}</p>}
              {legal && <p className="text-[length:var(--text-small)] leading-[1.6] text-deep-foreground/60 sm:text-right">{legal}</p>}
            </div>
          )}
        </motion.div>
      </TerminalNotch>
    </footer>
  );
};

export default FooterNotchReveal;
