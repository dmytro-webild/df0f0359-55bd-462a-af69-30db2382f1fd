import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import NickhoOdometer from "@/components/kit/NickhoOdometer";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Stat = { value: number | string; prefix?: string; suffix?: string; label: string };

type GalleryParticleYardProps = {
  label?: string;
  title?: string;
  description?: string;
  items?: Stat[];
  ariaLabel?: string;
  className?: string;
};

const columns = (count: number) => {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 4) return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
};

const GalleryParticleYard = ({
  label = "Seen whole",
  title = "Every part, every minute",
  description,
  items = [],
  ariaLabel,
  className,
}: GalleryParticleYardProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const play = useInView(listRef, { once: true, amount: 0.3 });

  return (
    <section data-particle="overview" aria-label={ariaLabel ?? title} className={cn("relative z-[1] overflow-clip py-[var(--section-space)] text-deep-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col">
        <div className="mx-auto flex max-w-[56rem] flex-col items-center text-center">
          {label && <p className="text-[length:var(--text-body-lg)] leading-[1.3] text-[color-mix(in_srgb,var(--deep-foreground)_65%,var(--deep))]">{label}</p>}
          <TerminalTitleSweep
            text={title}
            from="color-mix(in srgb, var(--deep-foreground) 22%, var(--deep))"
            final="var(--deep-foreground)"
            className={cn("max-w-[16em] text-balance text-[length:var(--text-h1)] leading-[1] tracking-[var(--heading-tracking)] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]", label && "mt-[clamp(0.75rem,1.4vw,1.25rem)]")}
          />
          {description && (
            <p className="mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[40rem] text-pretty text-[length:var(--text-body)] leading-[1.4] tracking-[0.02em] text-[color-mix(in_srgb,var(--deep-foreground)_65%,var(--deep))]">{description}</p>
          )}
        </div>
        <div data-particle-focus aria-hidden="true" className="h-[min(78svh,50rem)] min-h-[22rem]" />
        {items.length > 0 && (
          <ul ref={listRef} className={cn("grid gap-x-[var(--gap)] gap-y-[clamp(1.75rem,3vw,2.5rem)]", columns(items.length))}>
            {items.map((item, index) => (
              <li key={`${index}-${item.label}`} className="flex min-w-0 flex-col gap-3 border-t border-deep-foreground/15 pt-[clamp(1.25rem,2vw,1.75rem)] [container-type:inline-size]">
                <NickhoOdometer
                  value={item.value}
                  prefix={item.prefix}
                  suffix={item.suffix}
                  play={play}
                  duration={1.2}
                  delay={0.15 + index * 0.1}
                  className="font-mono text-[length:min(var(--text-h2),15cqi)] tracking-[-0.02em]"
                />
                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={play || reduce ? { opacity: 1, y: 0 } : undefined}
                  transition={{ duration: kit.base, ease: kit.ease, delay: 0.1 + index * 0.06 }}
                  className="text-balance text-[length:var(--text-body)] leading-[1.4] text-deep-foreground/70 [overflow-wrap:anywhere]"
                >
                  {item.label}
                </motion.p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default GalleryParticleYard;
