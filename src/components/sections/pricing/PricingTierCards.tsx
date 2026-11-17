import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import TerminalReveal from "@/components/kit/TerminalReveal";
import TerminalNotch from "@/components/kit/TerminalNotch";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Tier = {
  label: string;
  title: string;
  description?: string;
  price?: string;
  period?: string;
  features?: string[];
  imageSrc?: string;
  imageAlt?: string;
  cta: { text: string; href: string };
};

type PricingTierCardsProps = {
  title: string;
  items: Tier[];
  ariaLabel?: string;
  className?: string;
};

const pad = (value: number) => String(value).padStart(2, "0");

const PricingTierCards = ({ title, items, ariaLabel, className }: PricingTierCardsProps) => {
  const reduce = useReducedMotion();
  const { slow, ease, distance } = useKitMotion();
  const count = items.length;
  const priceChars = Math.max(4, ...items.map((tier) => tier.price?.length ?? 0));
  const cols = count === 1 ? "lg:mx-auto lg:max-w-[36rem]" : count === 2 ? "lg:grid-cols-2" : count === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-4";

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto w-[var(--container)]">
        <TerminalTitleSweep
          text={title}
          className="mx-auto max-w-[16em] text-balance text-center text-[length:var(--text-h1)] leading-[1] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
        />
        <ul className={cn("mt-[clamp(3rem,6vw,5rem)] grid gap-[var(--gap)]", cols)}>
          {items.map((tier, index) => (
            <motion.li
              key={`${index}-${tier.title}`}
              initial={reduce ? false : { opacity: 0, y: distance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: slow, ease, delay: index * 0.1 }}
              className="min-w-0"
            >
              <article className="kit-card @container flex h-full flex-col p-[clamp(1.5rem,2.8vw,2.5rem)]">
                <div className="font-mono text-[length:var(--text-label)] uppercase leading-[1.3] tracking-[var(--label-tracking)] text-muted-foreground [overflow-wrap:anywhere]">
                  <p aria-hidden="true" className="inline">{pad(index + 1)}</p>{" "}<p className="inline">{tier.label}</p>
                </div>
                <h3 className="mt-[clamp(1.25rem,2vw,1.75rem)] text-[length:var(--text-body-lg)] leading-[1.3] tracking-[-0.01em] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]">
                  {tier.title}
                </h3>
                {tier.description && (
                  <p className="mt-[clamp(1rem,1.6vw,1.5rem)] text-[length:var(--text-body)] leading-[1.4] tracking-[0.02em] text-muted-foreground [overflow-wrap:anywhere]">
                    {tier.description}
                  </p>
                )}
                {tier.price && (
                  <div className="mt-[clamp(1.5rem,2.4vw,2.25rem)] flex min-w-0 flex-col gap-2">
                    <p
                      style={{ fontSize: `min(var(--text-h2), calc(100cqw / ${(priceChars * 0.58).toFixed(2)}))` }}
                      className="whitespace-nowrap leading-none tracking-[var(--heading-tracking)] tabular-nums [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]"
                    >
                      {tier.price}
                    </p>
                    {tier.period && <p className="font-mono text-[length:var(--text-label)] uppercase leading-[1.3] tracking-[var(--label-tracking)] text-muted-foreground">{tier.period}</p>}
                  </div>
                )}
                {tier.features && tier.features.length > 0 && (
                  <ul className="mt-[clamp(1.5rem,2.4vw,2.25rem)] flex flex-col gap-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={`${featureIndex}-${feature}`} className="flex items-baseline gap-3">
                        <div aria-hidden="true" className="size-[0.5rem] shrink-0 translate-y-[-0.1em] rounded-full bg-accent" />
                        <p className="min-w-0 text-[length:var(--text-body)] leading-[1.4] [overflow-wrap:anywhere]">{feature}</p>
                      </li>
                    ))}
                  </ul>
                )}
                {tier.imageSrc && (
                  <TerminalReveal delay={0.15 + index * 0.1} className="mt-[clamp(1.25rem,2vw,1.75rem)] w-full">
                    <TerminalNotch top={{ size: 0.5, from: 1, to: -1 }} depth={14} radius={10} cornerRadius={12} className="aspect-[16/11] w-full">
                      <Media src={tier.imageSrc} alt={tier.imageAlt ?? ""} loading="lazy" decoding="async" className="absolute inset-0 size-full object-cover" />
                    </TerminalNotch>
                  </TerminalReveal>
                )}
                <div className="mt-auto pt-[clamp(1.75rem,2.4vw,2.25rem)]">
                  <a href={tier.cta.href} className="btn-secondary min-h-[3.6875rem] w-full tracking-[0.12375rem]">
                    <p className="btn-label">{tier.cta.text}</p>
                  </a>
                </div>
              </article>
            </motion.li>
          ))}
        </ul>
        <div className="mt-[clamp(2.5rem,5vw,4rem)] rounded-[calc(var(--radius-card)*0.7)] border border-border bg-card p-[clamp(1.5rem,3vw,2.5rem)] text-center shadow-sm">
          <p className="font-mono text-[length:var(--text-label)] uppercase tracking-[var(--label-tracking)] text-accent font-semibold">
            Accepted Payment Methods for Passes
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-xs sm:text-sm font-semibold text-foreground">
              <span className="text-emerald-500 font-bold">🟢</span> Cash App: <span className="text-accent font-bold">$ExclusiveSliding</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-xs sm:text-sm font-semibold text-foreground">
              <span>💳</span> Credit & Debit Card
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-xs sm:text-sm font-semibold text-foreground">
              <span>📱</span> Venmo & Apple Pay
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 font-mono text-xs sm:text-sm font-semibold text-foreground">
              <span>💵</span> Cash at Entrance Gate
            </div>
          </div>
          <p className="mt-4 text-[length:var(--text-body)] text-muted-foreground">
            Have questions or need to pay via Cash App? Call or text the crew directly at{" "}
            <a href="tel:8128008244" className="font-semibold text-foreground underline hover:text-accent transition-colors">
              812-800-8244
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingTierCards;
