import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type FaqItem = { title: string; description: string };

type FaqLimeAccordionProps = {
  label?: string;
  title: string;
  description?: string;
  items: FaqItem[];
  contactLabel?: string;
  contactTitle?: string;
  contactButton?: { text: string; href: string };
  ariaLabel?: string;
  className?: string;
};

const FaqLimeAccordion = ({ label, title, description, items, contactLabel, contactTitle, contactButton, ariaLabel, className }: FaqLimeAccordionProps) => {
  const uid = useId();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto grid w-[var(--container)] grid-cols-1 gap-x-[var(--gap)] gap-y-[clamp(2rem,5vw,3rem)] lg:grid-cols-12">
        <div className="flex min-w-0 flex-col lg:sticky lg:top-[9.5rem] lg:col-span-5 lg:self-start">
          {label && <p className="text-[length:var(--text-body-lg)] leading-[1.3] text-muted-foreground">{label}</p>}
          <TerminalTitleSweep
            text={title}
            className={cn("max-w-[16em] text-balance text-[length:var(--text-h1)] leading-none tracking-[-0.05em] [overflow-wrap:anywhere]", label && "mt-[clamp(0.75rem,1.4vw,1.25rem)]")}
          />
          {description && (
            <p className="mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[40rem] text-pretty text-[length:var(--text-body)] leading-[1.45] tracking-[0.02em] text-muted-foreground [overflow-wrap:anywhere]">{description}</p>
          )}
          {(contactTitle || contactButton) && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="relative mt-[clamp(2.5rem,5vw,4rem)] max-w-[26rem] rounded-[calc(var(--radius-card)*0.7)] bg-card p-[clamp(1.5rem,2.6vw,2rem)] text-card-foreground"
            >
              <div aria-hidden="true" className="absolute bottom-[calc(100%-1px)] left-[16%] right-[16%] h-[0.75rem] bg-card [clip-path:polygon(0.75rem_0,calc(100%-0.75rem)_0,100%_100%,0_100%)]" />
              {contactLabel && (
                <p className="font-mono text-[length:var(--text-label)] font-semibold uppercase leading-[1.3] tracking-[var(--label-tracking)] text-muted-foreground [overflow-wrap:anywhere]">{contactLabel}</p>
              )}
              {contactTitle && (
                <p className={cn("text-balance text-[length:var(--text-body-lg)] leading-[1.3] [overflow-wrap:anywhere]", contactLabel && "mt-[0.75rem]")}>{contactTitle}</p>
              )}
              {contactButton && (
                <a href={contactButton.href} className="btn-primary mt-[clamp(1.25rem,2.4vw,1.75rem)] min-h-[3rem] w-full">
                  <p className="btn-label">{contactButton.text}</p>
                </a>
              )}
            </motion.div>
          )}
        </div>
        <ul className="min-w-0 lg:col-span-7 lg:col-start-6 xl:col-span-6 xl:col-start-7">
          {items.map((item, index) => {
            const isOpen = open === index;
            return (
              <motion.li
                key={index}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1], delay: Math.min(index, 6) * 0.05 }}
                className="relative"
              >
                <h3>
                  <button
                    type="button"
                    id={`${uid}-q${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-[clamp(1rem,3vw,2.5rem)] py-[clamp(1.5rem,2.6vw,2.25rem)] text-left text-[length:var(--text-body-lg)] leading-[1.4] tracking-normal text-pretty outline-none [font-family:var(--font-body)] [overflow-wrap:anywhere] focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    {item.title}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "relative size-6 shrink-0 text-muted-foreground/60 transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]",
                        isOpen && "rotate-45",
                      )}
                    >
                      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                    </div>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${uid}-a${index}`}
                      role="region"
                      aria-labelledby={`${uid}-q${index}`}
                      initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[40em] pb-[clamp(1.5rem,2.6vw,2.25rem)] pr-[clamp(2rem,5vw,4rem)] text-pretty text-[length:var(--text-body)] leading-[1.4] text-muted-foreground [overflow-wrap:anywhere]">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div
                  aria-hidden="true"
                  className="mx-[clamp(1rem,3vw,2.5rem)] h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--accent)_75%,transparent),transparent)]"
                />
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FaqLimeAccordion;
