import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { usePreloadImages } from "@/components/kit/kitMotion";
import TerminalTitleSweep from "@/components/kit/TerminalTitleSweep";
import Media from "@/components/kit/Media";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type Logo = { imageSrc: string; imageAlt?: string };

type FieldKey = "name" | "role" | "phone" | "email" | "company" | "topic";

type ContactData = Record<FieldKey, string>;

type ContactDarkFormCardTerminalProps = {
  label?: string;
  title: string;
  description?: string;
  itemsTitle?: string;
  items?: string[];
  note?: string;
  logosTitle?: string;
  logos?: Logo[];
  topics?: string[];
  labels?: Partial<Record<FieldKey, string | false>>;
  placeholders?: Partial<Record<FieldKey, string>>;
  submitText?: string;
  successText?: string;
  onSubmit?: (data: ContactData) => void;
  ariaLabel?: string;
  className?: string;
};

const defaultLabels: Record<FieldKey, string> = {
  name: "Full name",
  role: "Role or position",
  phone: "Phone number",
  email: "Email",
  company: "Company name",
  topic: "How can we help?",
};

const defaultHints: Record<FieldKey, string> = {
  name: "Your name",
  role: "Your role",
  phone: "Your phone number",
  email: "you@email.com",
  company: "Your company",
  topic: "Tell us what you need",
};

const fieldMotion = (reduce: boolean | null, index: number) => ({
  initial: reduce ? false : { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -15% 0px" },
  transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] as [number, number, number, number], delay: 0.3 + index * 0.06 },
});

const ContactDarkFormCardTerminal = ({
  label,
  title,
  description,
  itemsTitle,
  items = [],
  note,
  logosTitle,
  logos = [],
  topics = [],
  labels = { name: "Full name", role: "Role or position", phone: "Phone number", email: "Email", company: "Company name", topic: "How can we help?" },
  placeholders = { name: "Your name", role: "Your role", phone: "Your phone number", email: "you@email.com", company: "Your company", topic: "Tell us what you need" },
  submitText = "Submit",
  successText = "Thank you, we will be in touch the same day.",
  onSubmit,
  ariaLabel,
  className,
}: ContactDarkFormCardTerminalProps) => {
  const uid = useId();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  usePreloadImages(sectionRef);
  const [sent, setSent] = useState(false);
  const text = { ...defaultLabels, ...labels };
  const hint = { ...defaultHints, ...placeholders };
  const hasSide = items.length > 0 || !!note || logos.length > 0;

  const onSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (key: FieldKey) => String(data.get(key) ?? "");
    onSubmit?.({ name: read("name"), role: read("role"), phone: read("phone"), email: read("email"), company: read("company"), topic: read("topic") });
    setSent(true);
  };

  return (
    <section ref={sectionRef} aria-label={ariaLabel ?? title} className={cn("relative bg-background py-[var(--section-space)] text-foreground", className)}>
      <div className="mx-auto flex w-[var(--container)] flex-col items-center">
        {label && <p className="text-center text-[length:var(--text-body-lg)] leading-[1.3] text-muted-foreground">{label}</p>}
        <TerminalTitleSweep
          text={title}
          className={cn("max-w-[16em] text-balance text-center text-[length:var(--text-h1)] leading-none tracking-[-0.05em] [overflow-wrap:anywhere]", label && "mt-[clamp(0.75rem,1.4vw,1.25rem)]")}
        />
        {description && (
          <p className="mt-[clamp(1.25rem,2.4vw,2rem)] max-w-[40rem] text-pretty text-center text-[length:var(--text-body)] leading-[1.45] tracking-[0.02em] text-muted-foreground [overflow-wrap:anywhere]">{description}</p>
        )}
        <div className={cn("mt-[clamp(2.5rem,6vw,5rem)] grid w-full grid-cols-1 gap-x-[clamp(2rem,6vw,7rem)] gap-y-[clamp(2rem,6vw,4rem)]", hasSide ? "lg:grid-cols-2" : "max-w-[42rem]")}>
          {hasSide && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex min-w-0 flex-col gap-[clamp(1.5rem,3vw,2.25rem)] lg:pt-[0.5rem]"
            >
              <div className="flex flex-col gap-3 rounded-[calc(var(--radius-card)*0.5)] border border-accent bg-accent/10 p-[clamp(1.25rem,2vw,1.75rem)] shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-accent">
                    Contact Crew Direct Line
                  </p>
                  <div aria-hidden="true" className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <a
                  href="tel:8128008244"
                  className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold tracking-tight text-foreground hover:text-accent transition-colors"
                >
                  812-800-8244
                </a>
                <p className="text-[length:var(--text-small)] text-muted-foreground">
                  Call or text our crew directly for ticket passes, Cash App confirmation, or gate info.
                </p>
                <a href="tel:8128008244" className="btn-primary mt-1 min-h-[2.75rem] w-full text-center">
                  <p className="btn-label">Call / Text Crew: 812-800-8244</p>
                </a>
              </div>

              <div className="flex flex-col gap-2 rounded-[calc(var(--radius-card)*0.5)] border border-border bg-card p-4">
                <p className="font-mono text-[length:var(--text-label)] font-semibold uppercase tracking-[var(--label-tracking)] text-accent font-semibold">
                  Ticket Payment Options
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="rounded-md border border-border bg-background px-2.5 py-1 text-foreground font-semibold">
                    🟢 Cash App: <strong className="text-accent">$ExclusiveSliding</strong>
                  </span>
                  <span className="rounded-md border border-border bg-background px-2.5 py-1 text-muted-foreground">
                    💳 Venmo
                  </span>
                  <span className="rounded-md border border-border bg-background px-2.5 py-1 text-muted-foreground">
                    🍎 Apple Pay
                  </span>
                  <span className="rounded-md border border-border bg-background px-2.5 py-1 text-muted-foreground">
                    💳 Cards
                  </span>
                  <span className="rounded-md border border-border bg-background px-2.5 py-1 text-muted-foreground">
                    💵 Cash at Gate
                  </span>
                </div>
              </div>

              {items.length > 0 && (
                <div className="flex flex-col gap-[1rem]">
                  {itemsTitle && (
                    <p className="font-mono text-[length:var(--text-label)] font-semibold uppercase leading-[1.3] tracking-[var(--label-tracking)] text-muted-foreground [overflow-wrap:anywhere]">{itemsTitle}</p>
                  )}
                  <ol className="border-b border-border">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-baseline gap-[clamp(1rem,2.4vw,2rem)] border-t border-border py-[clamp(0.75rem,1.8vw,1.375rem)]">
                        <p aria-hidden="true" className="w-[2.5ch] shrink-0 font-mono text-[length:var(--text-label)] font-semibold leading-none tracking-[var(--label-tracking)] text-muted-foreground">{String(index + 1).padStart(2, "0")}</p>
                        <p className="min-w-0 text-[length:var(--text-body-lg)] leading-[1.3] [overflow-wrap:anywhere]">{item}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {note && (
                <div className="flex items-center gap-[0.75rem]">
                  <div aria-hidden="true" className="size-[0.5rem] shrink-0 animate-pulse rounded-full bg-accent shadow-[0_0_0_0.25rem_color-mix(in_srgb,var(--accent)_25%,transparent)]" />
                  <p className="font-mono text-[length:var(--text-label)] font-semibold uppercase leading-[1.3] tracking-[var(--label-tracking)] text-muted-foreground [overflow-wrap:anywhere]">{note}</p>
                </div>
              )}
              {logos.length > 0 && (
                <div className="flex flex-col gap-[clamp(1.25rem,2.4vw,2rem)]">
                  {logosTitle && <p className="text-[length:var(--text-body-lg)] leading-[1.3] text-muted-foreground [overflow-wrap:anywhere]">{logosTitle}</p>}
                  <ul className="flex flex-wrap items-center gap-x-[clamp(1.5rem,3vw,2.5rem)] gap-y-5">
                    {logos.map((logo, index) => (
                      <li key={index} className="flex h-[clamp(1.75rem,2.6vw,2.25rem)] items-center">
                        <Media src={logo.imageSrc} alt={logo.imageAlt ?? ""} loading="lazy" decoding="async" className="h-full w-auto max-w-[8rem] object-contain" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="relative mt-[0.875rem] min-w-0 rounded-[calc(var(--radius-card)*0.7)] bg-deep px-[clamp(1.25rem,3.4vw,3rem)] py-[clamp(1.75rem,3.4vw,3rem)] text-deep-foreground shadow-[0_2.5rem_6rem_-1.5rem_color-mix(in_srgb,var(--foreground)_30%,transparent)]"
          >
            <div aria-hidden="true" className="absolute bottom-[calc(100%-1px)] left-[16%] right-[16%] h-[0.875rem] bg-deep [clip-path:polygon(0.875rem_0,calc(100%-0.875rem)_0,100%_100%,0_100%)]" />
            <form onSubmit={onSend} className="flex flex-col gap-[clamp(1.25rem,2.6vw,2.25rem)]">
              <div className="grid grid-cols-1 gap-[clamp(1.25rem,2.6vw,2.25rem)] sm:grid-cols-2 sm:gap-x-[clamp(1.5rem,2.8vw,2.5rem)]">
                {(["name", "role", "phone", "email"] as const)
                  .filter((key) => {
                    if (!labels) return true;
                    if (key === "role") return Boolean(labels.role);
                    return labels[key] !== "" && labels[key] !== false;
                  })
                  .map((key, index) => (
                  <motion.div key={key} {...fieldMotion(reduce, index)} className="flex min-w-0 flex-col gap-2">
                    <label htmlFor={`${uid}-${key}`} className="text-[length:var(--text-body)] leading-[1.4] [overflow-wrap:anywhere]">
                      {key === "name" || key === "email" ? `${text[key]} *` : text[key]}
                    </label>
                    <input
                      id={`${uid}-${key}`}
                      name={key}
                      type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                      required={key === "name" || key === "email"}
                      autoComplete={key === "name" ? "name" : key === "email" ? "email" : key === "phone" ? "tel" : "organization-title"}
                      placeholder={hint[key]}
                      disabled={sent}
                      className="w-full min-w-0 border-0 border-b border-deep-foreground/25 bg-transparent pb-3 pt-1 text-[length:var(--text-body)] text-deep-foreground outline-none transition-colors duration-300 placeholder:text-deep-foreground/60 focus:border-accent disabled:opacity-60"
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div {...fieldMotion(reduce, 4)} className="flex min-w-0 flex-col gap-2">
                <label htmlFor={`${uid}-company`} className="text-[length:var(--text-body)] leading-[1.4] [overflow-wrap:anywhere]">
                  {text.company}
                </label>
                <input
                  id={`${uid}-company`}
                  name="company"
                  autoComplete="organization"
                  placeholder={hint.company}
                  disabled={sent}
                  className="w-full min-w-0 border-0 border-b border-deep-foreground/25 bg-transparent pb-3 pt-1 text-[length:var(--text-body)] text-deep-foreground outline-none transition-colors duration-300 placeholder:text-deep-foreground/60 focus:border-accent disabled:opacity-60"
                />
              </motion.div>
              <motion.div {...fieldMotion(reduce, 5)} className="flex min-w-0 flex-col gap-2">
                <label htmlFor={`${uid}-topic`} className="text-[length:var(--text-body)] leading-[1.4] [overflow-wrap:anywhere]">
                  {`${text.topic} *`}
                </label>
                {topics.length > 0 ? (
                  <select
                    id={`${uid}-topic`}
                    name="topic"
                    required
                    defaultValue=""
                    disabled={sent}
                    className="w-full min-w-0 cursor-pointer appearance-none border-0 border-b border-deep-foreground/25 bg-transparent bg-[linear-gradient(45deg,transparent_50%,currentColor_50%),linear-gradient(135deg,currentColor_50%,transparent_50%)] bg-[length:0.35rem_0.35rem,0.35rem_0.35rem] bg-[position:calc(100%-0.6rem)_50%,calc(100%-0.25rem)_50%] bg-no-repeat pb-3 pr-8 pt-1 text-[length:var(--text-body)] text-deep-foreground outline-none transition-colors duration-300 focus:border-accent disabled:opacity-60 [&>option]:bg-deep [&>option]:text-deep-foreground"
                  >
                    <option value="" disabled>
                      {hint.topic}
                    </option>
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                ) : (
                  <textarea
                    id={`${uid}-topic`}
                    name="topic"
                    required
                    rows={3}
                    placeholder={hint.topic}
                    disabled={sent}
                    className="w-full min-w-0 resize-none border-0 border-b border-deep-foreground/25 bg-transparent pb-3 pt-1 text-[length:var(--text-body)] leading-[1.4] text-deep-foreground outline-none transition-colors duration-300 placeholder:text-deep-foreground/60 focus:border-accent disabled:opacity-60"
                  />
                )}
              </motion.div>
              <motion.div {...fieldMotion(reduce, 6)} className="mt-[clamp(0.25rem,1vw,0.75rem)] flex flex-col gap-3">
                <button type="submit" disabled={sent} className="btn-primary min-h-[3.6875rem] w-full tracking-[0.12375rem] before:bg-deep-foreground hover:text-deep focus-visible:text-deep disabled:cursor-default disabled:opacity-60">
                  <p className="btn-label">{submitText}</p>
                </button>
                <AnimatePresence>
                  {sent && (
                    <motion.p
                      role="status"
                      initial={reduce ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                      className="text-center text-[length:var(--text-body)] leading-[1.4] text-deep-foreground/80 [overflow-wrap:anywhere]"
                    >
                      {successText}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactDarkFormCardTerminal;
