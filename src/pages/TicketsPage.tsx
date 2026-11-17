import { useState } from "react";
import {
  Ticket,
  CreditCard,
  QrCode,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Download,
  Share2,
  HelpCircle,
  Zap,
  Users
} from "lucide-react";

interface PassOption {
  id: string;
  name: string;
  price: number;
  badge: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const PASS_OPTIONS: PassOption[] = [
  {
    id: "show-shine",
    name: "Show & Shine Pass",
    price: 20,
    badge: "GENERAL ENTRY",
    description: "General admission pass including Show & Shine vehicle display entry, voting access, and spectator grounds.",
    features: [
      "Show & Shine Arena entry",
      "Spectator viewing & vehicle voting",
      "General grounds & vendor access",
      "Pay via Cash App ($ExclusiveSliding), Card, or Gate"
    ]
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: 40,
    badge: "MOST POPULAR",
    popular: true,
    description: "VIP spectator pass featuring reserved trackside lounge access, exclusive merch lanyard, and priority gate entry.",
    features: [
      "Priority VIP gate entrance",
      "Reserved front row trackside parking",
      "Trackside VIP lounge & pit area access",
      "Exclusive lanyard & decal pack"
    ]
  },
  {
    id: "vip-all-access",
    name: "Vendor Pass",
    price: 80,
    badge: "VENDOR PASS",
    description: "Ultimate vendor booth pass & garage staging area access.",
    features: [
      "Exclusive vendor booth placement",
      "Full trackside paddock access",
      "Passenger hot-lap ride-along",
      "Priority sponsor branding placement"
    ]
  }
];

type PaymentMethod = "gate" | "cashapp" | "card" | "venmo";

interface IssuedTicket {
  ticketCode: string;
  passName: string;
  quantity: number;
  totalPrice: number;
  attendeeName: string;
  phone: string;
  email: string;
  paymentMethod: string;
  paymentRef: string;
  dateIssued: string;
}

export default function TicketsPage() {
  const [selectedPassId, setSelectedPassId] = useState<string>("show-shine");
  const [quantity, setQuantity] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("gate");

  // Form Fields
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [cashAppTag, setCashAppTag] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExp, setCardExp] = useState<string>("");
  const [cardCvc, setCardCvc] = useState<string>("");
  const [cardZip, setCardZip] = useState<string>("");

  // UI States
  const [copiedCashApp, setCopiedCashApp] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [issuedTicket, setIssuedTicket] = useState<IssuedTicket | null>(null);
  const [copiedTicketCode, setCopiedTicketCode] = useState<boolean>(false);

  const activePass = PASS_OPTIONS.find((p) => p.id === selectedPassId) || PASS_OPTIONS[1];
  const totalPrice = activePass.price * quantity;

  const handleCopyCashApp = () => {
    navigator.clipboard.writeText("$jaydenmilliee07");
    setCopiedCashApp(true);
    setTimeout(() => setCopiedCashApp(false), 2500);
  };

  const handleCopyTicketCode = () => {
    if (issuedTicket) {
      navigator.clipboard.writeText(issuedTicket.ticketCode);
      setCopiedTicketCode(true);
      setTimeout(() => setCopiedTicketCode(false), 2500);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter your full name and phone number to complete pass issuance.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const code = `ES-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      let ref = "Gate Reservation";
      if (paymentMethod === "cashapp") ref = cashAppTag ? `Cash App: ${cashAppTag}` : "Cash App ($ExclusiveSliding)";
      if (paymentMethod === "card") ref = `Card ending in ${cardNumber.slice(-4) || "8821"}`;
      if (paymentMethod === "venmo") ref = "Venmo / Apple Pay Transfer";

      const ticket: IssuedTicket = {
        ticketCode: code,
        passName: activePass.name,
        quantity,
        totalPrice,
        attendeeName: name,
        phone,
        email: email || "Registered via SMS",
        paymentMethod:
          paymentMethod === "cashapp"
            ? "Cash App ($ExclusiveSliding)"
            : paymentMethod === "card"
            ? "Credit / Debit Card Online"
            : paymentMethod === "venmo"
            ? "Venmo / Apple Pay"
            : "Pay at Gate (Cash/Card)",
        paymentRef: ref,
        dateIssued: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      };

      setIssuedTicket(ticket);
      setIsProcessing(false);
      window.scrollTo({ top: 100, behavior: "smooth" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-[5.5rem] pb-24" id="tickets-page">
      {/* Top Banner / Hero Header */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900 to-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none" />
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/40 bg-red-950/50 px-4 py-1.5 text-xs sm:text-sm font-mono text-red-400 uppercase tracking-widest mb-6">
            <Sparkles className="size-4 text-red-500 animate-pulse" />
            Official Ticket Payment Portal
          </div>
          <h1 className="text-[length:min(var(--text-display),12.5vw)] font-bold tracking-tight text-white uppercase [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]">
            Get Online Passes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
            Select your ticket tier, choose your payment option (Cash App, Credit Card, Venmo, or Gate), and receive your digital event pass instantly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-mono">
            <a
              href="tel:8128008244"
              className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-700 px-4 py-2 text-zinc-200 hover:border-red-500 transition-colors"
            >
              <Phone className="size-4 text-red-500" />
              Call/Text Crew: 812-800-8244
            </a>
            <button
              onClick={handleCopyCashApp}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-950/60 border border-emerald-600/40 px-4 py-2 text-emerald-300 hover:bg-emerald-900/50 transition-colors"
            >
              <Zap className="size-4 text-emerald-400" />
              Cash App: $jaydenmilliee07 {copiedCashApp ? "(Copied!)" : "(Click to Copy)"}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12">
        {/* If Digital Ticket is Issued */}
        {issuedTicket ? (
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-red-600/80 bg-zinc-950 p-6 sm:p-10 shadow-2xl shadow-red-900/20">
            <div className="text-center border-b border-zinc-800 pb-8">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/50 mb-4">
                <CheckCircle2 className="size-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
                Digital Pass Issued!
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Show this digital pass or give your name / ticket code at the entrance gate.
              </p>
            </div>

            {/* Ticket Card graphic */}
            <div className="mt-8 rounded-xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 p-6 sm:p-8 relative overflow-hidden shadow-inner">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800/80 pb-6 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-red-500 font-semibold">
                    EXCLUSIVE SLIDING • 2026 EVENT PASS
                  </span>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight mt-1">
                    {issuedTicket.passName}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Qty: {issuedTicket.quantity} Pass{issuedTicket.quantity > 1 ? "es" : ""} | Total Paid: ${issuedTicket.totalPrice}
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2 text-right">
                  <span className="text-[10px] text-zinc-500 uppercase block font-mono">Ticket Code</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-mono font-bold text-red-400">{issuedTicket.ticketCode}</span>
                    <button
                      onClick={handleCopyTicketCode}
                      className="text-zinc-400 hover:text-white transition-colors"
                      title="Copy Ticket Code"
                    >
                      {copiedTicketCode ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Attendee Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-zinc-800/80 text-sm">
                <div>
                  <span className="text-xs text-zinc-500 font-mono uppercase block">Attendee Name</span>
                  <span className="font-semibold text-white">{issuedTicket.attendeeName}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-mono uppercase block">Phone Contact</span>
                  <span className="font-semibold text-white">{issuedTicket.phone}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-mono uppercase block">Payment Method</span>
                  <span className="font-semibold text-emerald-400">{issuedTicket.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 font-mono uppercase block">Payment Details</span>
                  <span className="font-mono text-zinc-300 text-xs">{issuedTicket.paymentRef}</span>
                </div>
              </div>

              {/* QR Code Barcode Visual */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg shrink-0">
                    <QrCode className="size-20 text-black" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 uppercase font-semibold block flex items-center gap-1">
                      <ShieldCheck className="size-3.5 inline" /> Entry Guaranteed
                    </span>
                    <p className="text-xs text-zinc-400 max-w-xs mt-1">
                      Scan QR code or present ticket code <span className="font-mono text-white">{issuedTicket.ticketCode}</span> upon arrival.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Download className="size-4" /> Print / Save Pass
                  </button>
                  <a
                    href={`sms:8128008244?body=Hi Crew, here is my ticket pass code ${issuedTicket.ticketCode} for ${issuedTicket.attendeeName}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Share2 className="size-4" /> Text Pass to Crew
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIssuedTicket(null)}
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white underline transition-colors"
              >
                ← Buy or Reserve Another Ticket
              </button>
            </div>
          </div>
        ) : (
          /* Ticket Ordering & Payment Flow */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step 1: Select Pass Tier */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white flex items-center gap-2">
                  <Ticket className="size-6 text-red-500" /> 1. Select Ticket Tier
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Choose your level of access for Exclusive Sliding 2026.
                </p>
              </div>

              <div className="space-y-4">
                {PASS_OPTIONS.map((pass) => {
                  const isSelected = pass.id === selectedPassId;
                  return (
                    <div
                      key={pass.id}
                      onClick={() => setSelectedPassId(pass.id)}
                      className={`cursor-pointer rounded-xl border p-5 transition-all duration-200 relative ${
                        isSelected
                          ? "border-red-600 bg-zinc-900/90 shadow-lg shadow-red-950/30 ring-1 ring-red-600"
                          : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                      }`}
                    >
                      {pass.popular && (
                        <span className="absolute -top-3 right-4 rounded-full bg-red-600 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white shadow">
                          {pass.badge}
                        </span>
                      )}

                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-white uppercase">{pass.name}</h3>
                            {!pass.popular && (
                              <span className="text-[10px] font-mono rounded bg-zinc-800 px-2 py-0.5 text-zinc-300">
                                {pass.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 mt-1">{pass.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-2xl font-bold font-mono text-red-500">${pass.price}</span>
                          <span className="text-xs text-zinc-500 block">/ pass</span>
                        </div>
                      </div>

                      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 border-t border-zinc-800/80 pt-3">
                        {pass.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="size-3.5 text-red-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Quantity Selector */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-white uppercase block">Pass Quantity</span>
                  <span className="text-xs text-zinc-400">Select number of tickets</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-lg p-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="size-8 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-lg text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="size-8 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Integrated Payment & Checkout Form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-xl sticky top-24">
                <h2 className="text-xl font-bold uppercase tracking-wide text-white flex items-center gap-2 mb-4 border-b border-zinc-800 pb-3">
                  <CreditCard className="size-5 text-red-500" /> 2. Integrated Payment
                </h2>

                {/* Order Summary Bar */}
                <div className="rounded-lg bg-zinc-900/90 border border-zinc-800 p-4 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400 font-mono uppercase">{activePass.name} (x{quantity})</span>
                    <span className="font-mono text-white">${activePass.price * quantity}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t border-zinc-800 mt-2 pt-2">
                    <span className="text-white uppercase">Total Amount</span>
                    <span className="font-mono text-red-500">${totalPrice}</span>
                  </div>
                </div>

                {/* Payment Method Tabs */}
                <div className="space-y-3 mb-6">
                  <label className="text-xs font-mono uppercase text-zinc-400 block">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cashapp")}
                      className={`p-2.5 rounded-lg border text-xs font-mono uppercase font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "cashapp"
                          ? "border-emerald-500 bg-emerald-950/80 text-emerald-300 ring-1 ring-emerald-500"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <Zap className="size-4 text-emerald-400" /> Cash App
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-2.5 rounded-lg border text-xs font-mono uppercase font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "card"
                          ? "border-red-600 bg-red-950/80 text-red-300 ring-1 ring-red-600"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <CreditCard className="size-4 text-red-400" /> Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("venmo")}
                      className={`p-2.5 rounded-lg border text-xs font-mono uppercase font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "venmo"
                          ? "border-sky-500 bg-sky-950/80 text-sky-300 ring-1 ring-sky-500"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <Users className="size-4 text-sky-400" /> Venmo / Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("gate")}
                      className={`p-2.5 rounded-lg border text-xs font-mono uppercase font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "gate"
                          ? "border-amber-500 bg-amber-950/80 text-amber-300 ring-1 ring-amber-500"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <Ticket className="size-4 text-amber-400" /> Pay at Gate
                    </button>
                  </div>
                </div>

                {/* Specific Payment Option Details */}
                <form onSubmit={handleCheckout} className="space-y-4">
                  {/* Cash App Instructions */}
                  {paymentMethod === "cashapp" && (
                    <div className="rounded-xl border border-emerald-600/40 bg-emerald-950/30 p-4 space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-emerald-400 font-bold uppercase">Cash App Tag:</span>
                        <button
                          type="button"
                          onClick={handleCopyCashApp}
                          className="inline-flex items-center gap-1 font-mono text-white bg-emerald-900/80 hover:bg-emerald-800 px-2.5 py-1 rounded border border-emerald-600/50"
                        >
                          $ExclusiveSliding {copiedCashApp ? <Check className="size-3 text-emerald-300" /> : <Copy className="size-3" />}
                        </button>
                      </div>
                      <p className="text-zinc-300 leading-relaxed">
                        Send <strong className="text-emerald-300">${totalPrice}</strong> to <span className="font-mono text-white">$ExclusiveSliding</span>. Enter your Cash App handle below so our crew can match your pass:
                      </p>
                      <div>
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Your $Cashtag / Name on Cash App</label>
                        <input
                          type="text"
                          value={cashAppTag}
                          onChange={(e) => setCashAppTag(e.target.value)}
                          placeholder="$YourCashTag"
                          className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2 text-white font-mono placeholder:text-zinc-600 focus:border-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Card Payment Fields */}
                  {paymentMethod === "card" && (
                    <div className="space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
                      <div>
                        <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4000 1234 5678 9010"
                          className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-white font-mono placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Exp Date</label>
                          <input
                            type="text"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-white font-mono placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">CVC</label>
                          <input
                            type="text"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            placeholder="123"
                            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-white font-mono placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Zip Code</label>
                          <input
                            type="text"
                            value={cardZip}
                            onChange={(e) => setCardZip(e.target.value)}
                            placeholder="90210"
                            className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-2 text-white font-mono placeholder:text-zinc-600 focus:border-red-600 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Venmo / Apple Pay Instructions */}
                  {paymentMethod === "venmo" && (
                    <div className="rounded-xl border border-sky-600/40 bg-sky-950/30 p-4 space-y-2 text-xs">
                      <span className="font-mono text-sky-400 font-bold uppercase block">Venmo / Apple Pay Direct:</span>
                      <p className="text-zinc-300">
                        Transfer <strong>${totalPrice}</strong> to Venmo <span className="font-mono text-white">@ExclusiveSliding</span> or text 812-800-8244 for Apple Cash request.
                      </p>
                    </div>
                  )}

                  {/* Pay at Gate Instructions */}
                  {paymentMethod === "gate" && (
                    <div className="rounded-xl border border-amber-600/40 bg-amber-950/30 p-4 space-y-2 text-xs">
                      <span className="font-mono text-amber-400 font-bold uppercase block">Gate Reservation Mode:</span>
                      <p className="text-zinc-300">
                        Locks in your pass spot. Pay cash or card at the entrance gate upon arrival.
                      </p>
                    </div>
                  )}

                  {/* Attendee Fields */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-mono uppercase text-zinc-400 block">Attendee Registration</label>
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name (Required)"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-red-600 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number (SMS pass)"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-red-600 focus:outline-none"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email (Optional)"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3.5 px-4 uppercase tracking-wider text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-red-900/40"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2 font-mono">
                        <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating Digital Pass...
                      </span>
                    ) : (
                      <>
                        Pay ${totalPrice} & Get Pass <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Ticket FAQs / Information Section */}
        <section className="mt-20 border-t border-zinc-800 pt-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold uppercase tracking-wide text-white flex items-center gap-2 mb-6">
              <HelpCircle className="size-5 text-red-500" /> Ticket & Payment FAQs
            </h2>

            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="font-bold text-white text-base">How do I verify my Cash App payment?</h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  Send your total amount to <span className="font-mono text-emerald-400">$ExclusiveSliding</span> on Cash App. Include your full name in the Cash App memo. Once sent, our system or gate crew confirms your entry instantly against your phone number or digital pass code.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="font-bold text-white text-base">Can I pay with credit card or cash at the gate?</h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  Yes! We accept Cash App, Credit/Debit Cards, Venmo, Apple Pay, and Cash at the entrance gate. Reserving online guarantees your pass spot and priority entrance.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                <h3 className="font-bold text-white text-base">Who do I contact for ticket inquiries or group passes?</h3>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  Call or text our event crew directly at <a href="tel:8128008244" className="font-mono text-red-400 hover:underline">812-800-8244</a>. We are available 8:00 AM – 10:00 PM daily.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
