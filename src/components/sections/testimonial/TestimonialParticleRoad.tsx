import { motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useKitMotion } from "@/components/kit/kitMotion";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type TestimonialParticleRoadProps = {
  label?: string;
  quote?: string;
  name?: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  ariaLabel?: string;
  className?: string;
};

const TestimonialParticleRoad = ({
  label,
  quote = "Turnaround went from twelve minutes to under two in the first month.",
  name = "Dana Whitfield",
  role,
  company,
  avatarSrc,
  avatarAlt,
  ariaLabel,
  className,
}: TestimonialParticleRoadProps) => {
  const reduce = useReducedMotion();
  const kit = useKitMotion();
  const text = quote.trim().replace(/^["“”']+|["“”']+$/g, "");
  const meta = [role, company].filter(Boolean).join(", ");

  return (
    <section data-particle="ambient" aria-label={ariaLabel ?? `Testimonial from ${name}`} className={cn("relative z-[1] text-deep-foreground", className)}>
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_55%_42%_at_50%_50%,color-mix(in_srgb,var(--deep)_62%,transparent),transparent)]" />
      <div className="relative flex min-h-[max(100svh,32rem)] items-center">
        <figure className="mx-auto flex w-[var(--container)] flex-col items-center text-center">
          {label && <p className="text-[length:var(--text-body-lg)] leading-[1.3] text-[color-mix(in_srgb,var(--deep-foreground)_65%,var(--deep))]">{label}</p>}
          <blockquote className={cn("max-w-[18em] text-[length:var(--text-h2)]", label && "mt-[clamp(0.75rem,1.4vw,1.25rem)]")}>
            <TerminalTitleSweep
              tag="p"
              text={`“${text}”`}
              from="color-mix(in srgb, var(--deep-foreground) 22%, var(--deep))"
              final="var(--deep-foreground)"
              className="text-balance leading-[1.1] tracking-[-0.03em] [font-family:var(--font-heading)] [font-weight:var(--heading-weight)] [overflow-wrap:anywhere]"
            />
          </blockquote>
          <motion.figcaption
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: kit.base, ease: kit.ease, delay: 0.15 }}
            className="mt-[clamp(2rem,4vw,3rem)] flex max-w-full flex-col items-center gap-[1rem] border-t border-[color-mix(in_srgb,var(--deep-foreground)_20%,transparent)] pt-[clamp(1.25rem,2vw,1.75rem)] text-center sm:flex-row sm:text-left"
          >
            {avatarSrc && <Media src={avatarSrc} alt={avatarAlt ?? name} loading="lazy" decoding="async" className="size-[3rem] shrink-0 rounded-full object-cover" />}
            <div className="flex min-w-0 flex-col items-center gap-[0.375rem] sm:items-start">
              <p className="text-[length:var(--text-body)] font-medium leading-[1.2] [overflow-wrap:anywhere]">{name}</p>
              {meta && (
                <div className="font-mono text-[length:var(--text-label)] uppercase leading-[1.3] tracking-[var(--label-tracking)] text-[color-mix(in_srgb,var(--deep-foreground)_65%,var(--deep))] [overflow-wrap:anywhere]">
                  {role && <p className="inline">{role}</p>}
                  {role && company && <p aria-hidden="true" className="inline">, </p>}
                  {company && <p className="inline">{company}</p>}
                </div>
              )}
            </div>
          </motion.figcaption>
        </figure>
      </div>
    </section>
  );
};

export default TestimonialParticleRoad;
