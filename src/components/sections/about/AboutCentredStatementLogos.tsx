import { useRef, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Logo = { name: string; logoSrc?: string };

type AboutCentredStatementLogosProps = {
  label?: string;
  title: string;
  description?: string;
  items?: Logo[];
  ariaLabel?: string;
  className?: string;
};

const EXPO_IN_OUT: [number, number, number, number] = [0.87, 0, 0.13, 1];
const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const Cross = ({ index, still }: { index: number; still: boolean }) => (
  <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 z-[1] size-3 -translate-x-1/2 -translate-y-1/2">
    <motion.div
      className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[color-mix(in_srgb,var(--foreground)_45%,var(--background))]"
      animate={still ? undefined : { scaleY: [1, 0, 1] }}
      transition={{ duration: 5, ease: EXPO_IN_OUT, repeat: Infinity, delay: ((index * 7) % 20) / 10 }}
    />
    <motion.div
      className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[color-mix(in_srgb,var(--foreground)_45%,var(--background))]"
      animate={still ? undefined : { scaleX: [1, 0, 1] }}
      transition={{ duration: 5, ease: EXPO_IN_OUT, repeat: Infinity, delay: ((index * 11) % 20) / 10 }}
    />
  </div>
);

const AboutCentredStatementLogos = ({ label, title, description, items = [], ariaLabel, className }: AboutCentredStatementLogosProps) => {
  const reduce = useReducedMotion();
  const gridRef = useRef<HTMLUListElement>(null);
  const shown = useInView(gridRef, { margin: "0px 0px -30% 0px" });
  const visible = useInView(gridRef);
  const still = !!reduce || !visible;
  const logos = items.slice(0, 5);
  const odd = logos.length > 1 && logos.length % 2 === 1;

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col items-center text-center">
        {label && <p className="text-[length:var(--text-body-lg)] leading-[1.3] text-muted-foreground">{label}</p>}
        <TerminalTitleSweep
          text={title}
          className={cn("max-w-[16em] text-[length:var(--text-h1)] leading-none tracking-[-0.05em] text-balance", label && "mt-[clamp(0.75rem,1.4vw,1.25rem)]")}
        />
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.2 }}
            className="mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[40rem] text-[length:var(--text-body)] leading-[1.45] tracking-[0.02em] text-muted-foreground text-pretty"
          >
            {description}
          </motion.p>
        )}
      </div>

      {logos.length > 0 && (
        <div
          className="relative mx-auto mt-[clamp(3rem,7vw,6rem)] w-[var(--container)] lg:w-[min(100%-2*var(--gutter),calc(var(--cols)*14rem))]"
          style={{ "--cols": logos.length } as CSSProperties}
        >
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-screen max-w-[calc(100vw-2*var(--gutter))] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,var(--border)_15%,var(--border)_85%,transparent)]" />
          <ul ref={gridRef} className={cn("grid border-l border-border lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]", logos.length === 1 ? "grid-cols-1" : "grid-cols-2")}>
            {logos.map((item, i) => (
              <li key={`${i}-${item.name}`} className={cn("relative flex items-center justify-center border-b border-r border-border p-[14%] @container", logos.length === 1 ? "aspect-[2/1] lg:aspect-square" : "aspect-square")}>
                <Cross index={i} still={still} />
                <motion.div
                  className="flex h-full w-full items-center justify-center"
                  initial={reduce ? false : { opacity: 0.3, filter: "grayscale(1)" }}
                  animate={reduce || shown ? { opacity: 1, filter: "grayscale(0)" } : { opacity: 0.3, filter: "grayscale(1)" }}
                  transition={{ duration: 2.4, ease: EXPO_OUT, delay: shown ? i * 0.1 : 0 }}
                >
                  {item.logoSrc ? (
                    <Media src={item.logoSrc} alt={item.name} loading="lazy" decoding="async" className="max-h-[45%] max-w-full object-contain" />
                  ) : (
                    <p className="text-center text-[length:min(var(--text-h3),14cqw)] leading-[1.05] tracking-[-0.03em] [overflow-wrap:anywhere]">{item.name}</p>
                  )}
                </motion.div>
              </li>
            ))}
            {odd && (
              <li aria-hidden="true" className="relative aspect-square border-b border-r border-border lg:hidden">
                <Cross index={logos.length} still={still} />
              </li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default AboutCentredStatementLogos;
