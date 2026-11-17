import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Button = { text: string; href: string };

type HeroParticleTruckProps = {
  label?: string;
  title?: string;
  description?: string;
  primaryButton?: Button;
  secondaryButton?: Button;
  introDelay?: number;
  layout?: "split" | "stacked";
  ariaLabel?: string;
  className?: string;
};

const EXPO_OUT = [0.19, 1, 0.22, 1] as const;

const HeroParticleTruck = ({
  label = "Operating system",
  title = "Every moving part, finally in sync",
  description,
  primaryButton,
  secondaryButton,
  introDelay = 1.4,
  layout: layoutProp,
  ariaLabel,
  className,
}: HeroParticleTruckProps) => {
  const reduce = Boolean(useReducedMotion());
  const sectionRef = useRef<HTMLElement>(null);
  const [setLayout, setSetLayout] = useState<"split" | "stacked">("split");
  const layout = layoutProp ?? setLayout;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const read = () => setSetLayout(el.dataset.heroLayout === "stacked" ? "stacked" : "split");
    read();
    const observer = new MutationObserver(read);
    observer.observe(el, { attributes: true, attributeFilter: ["data-hero-layout"] });
    return () => observer.disconnect();
  }, []);
  const chars = useRef<(HTMLDivElement | null)[]>([]);
  const words = title.split(/\s+/).filter(Boolean);
  const hasButtons = Boolean(primaryButton || secondaryButton);
  const total = words.join("").length;
  const after = introDelay + 0.2 + Math.min(0.045, 1.2 / Math.max(total, 1)) * total;

  useEffect(() => {
    const list = chars.current.filter((el): el is HTMLDivElement => !!el);
    if (!list.length || reduce) return;
    const probe = list[0];
    const prev = probe.style.color;
    probe.style.color = "var(--accent)";
    const accent = getComputedStyle(probe).color;
    probe.style.color = prev;
    const white = getComputedStyle(probe).color;
    const stagger = Math.min(0.045, 1.2 / list.length);
    const animations = list.map((el, i) =>
      el.animate(
        [
          { opacity: 0, color: accent },
          { opacity: 1, color: accent, offset: 0.4 },
          { opacity: 1, color: white },
        ],
        { duration: 800, delay: (introDelay + 0.2 + i * stagger) * 1000, easing: "cubic-bezier(0.45, 0, 0.55, 1)", fill: "backwards" },
      ),
    );
    return () => animations.forEach((animation) => animation.cancel());
  }, [title, introDelay, reduce]);

  let charIndex = 0;

  return (
    <section ref={sectionRef} data-particle="hero" aria-label={ariaLabel ?? title} className={cn("relative z-[1] h-svh min-h-[40rem] text-deep-foreground", className)}>
      <div
        className={cn(
          "mx-auto flex h-full w-[var(--container)] flex-col pt-[clamp(6rem,14svh,8rem)] pb-[clamp(1.5rem,4svh,3rem)]",
          layout === "split" ? "lg:grid lg:grid-cols-2 lg:items-center lg:gap-[clamp(2rem,4vw,4rem)] lg:pt-[clamp(5rem,10svh,7rem)] lg:pb-[clamp(3rem,8svh,5rem)]" : "lg:pt-[clamp(7.5rem,15svh,9rem)] lg:pb-[clamp(2.5rem,6svh,4rem)]",
        )}
      >
        <div data-particle-text className="flex flex-col items-start text-left">
          {label && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EXPO_OUT, delay: introDelay }}
              className="mb-[clamp(0.75rem,1.4vw,1.25rem)] flex items-center gap-[0.625rem]"
            >
              <div aria-hidden="true" className="size-[0.5rem] shrink-0 bg-accent" />
              <p className="font-mono text-[length:var(--text-label)] font-semibold uppercase leading-[1.3] tracking-[var(--label-tracking)] text-deep-foreground/80">{label}</p>
            </motion.div>
          )}
          <h1 aria-label={title} className="max-w-[min(100%,11em)] text-[length:min(var(--text-display),12.5vw)] leading-[0.98] tracking-[-0.035em] text-balance [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]">
            {words.map((word, w) => (
              <div key={w} aria-hidden="true" className="inline">
                {w > 0 && " "}
                <div className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char) => {
                    const i = charIndex++;
                    return (
                      <div key={i} ref={(el) => void (chars.current[i] = el)} className="inline">
                        {char}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </h1>
          {description && (
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: after }}
              className="mt-[clamp(1rem,2vw,1.75rem)] max-w-[32rem] text-pretty text-[length:var(--text-body)] leading-[1.4] tracking-[0.02em] text-[color-mix(in_srgb,var(--deep-foreground)_65%,var(--deep))]"
            >
              {description}
            </motion.p>
          )}
          {hasButtons && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: EXPO_OUT, delay: after + 0.1 }}
              className="mt-[clamp(1.25rem,2.6vw,2.25rem)] flex w-full flex-col items-stretch gap-[0.5rem] sm:w-auto sm:flex-row"
            >
              {primaryButton && (
                <a href={primaryButton.href} className="btn-primary min-h-[3.25rem] px-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.12375rem]">
                  <p className="btn-label">{primaryButton.text}</p>
                </a>
              )}
              {secondaryButton && (
                <a href={secondaryButton.href} className="btn-secondary min-h-[3.25rem] bg-background px-[clamp(1.5rem,3vw,2.5rem)] tracking-[0.12375rem]">
                  <p className="btn-label">{secondaryButton.text}</p>
                </a>
              )}
            </motion.div>
          )}
        </div>
        <div
          data-particle-anchor
          aria-hidden="true"
          className={cn(
            "min-h-[12rem] flex-1",
            layout === "split" ? "mt-[clamp(1rem,3svh,2rem)] lg:mt-0 lg:h-[min(34rem,62svh)] lg:flex-none" : "order-first mb-[clamp(1.25rem,3.5svh,2.5rem)]",
          )}
        />
      </div>
    </section>
  );
};

export default HeroParticleTruck;
