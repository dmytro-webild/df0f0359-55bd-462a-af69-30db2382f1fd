"use client";

import { useState } from "react";
import {
  Ticket,
  CreditCard,
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Download,
  Share2,
  Zap,
  Users,
  MapPin
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
    description: "General spectator & vehicle display pass with voting entry.",
    features: [
      "Show & Shine Arena access",
      "Spectator viewing & vehicle voting",
      "General grounds & vendor access",
      "Reserve online — pay cash or card at gate"
    ]
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: 40,
    badge: "MOST POPULAR",
    popular: true,
    description: "Reserved trackside lounge access, lanyard & priority gate entry.",
    features: [
      "Priority VIP gate entrance",
      "Reserved trackside vehicle parking",
      "VIP lounge & pit area access",
      "Exclusive lanyard & decal pack"
    ]
  },
  {
    id: "vendor",
    name: "Vendor Pass",
    price: 80,
    badge: "VENDOR ACCESS",
    description: "Ultimate vendor booth pass & garage staging area access.",
    features: [
      "Exclusive vendor booth placement",
      "Full trackside paddock access",
      "Passenger hot-lap & garage staging",
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
  status: "RESERVED (PAY AT GATE)" | "CONFIRMED";
}

export default function HomeTicketsSection() {
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

  const activePass = PASS_OPTIONS.find((p) => p.id === selectedPassId) || PASS_OPTIONS[0];
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
      alert("Please enter your full name and phone number to complete ticket reservation.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const code = `ES-GATE-${Math.floor(100000 + Math.random() * 900000)}`;
      let ref = "Show & Pay Cash/Card at Entrance Gate";
      let statusText: "RESERVED (PAY AT GATE)" | "CONFIRMED" = "RESERVED (PAY AT GATE)";

      if (paymentMethod === "cashapp") {
        ref = cashAppTag ? `Cash App Tag: ${cashAppTag}` : "Cash App ($ExclusiveSliding)";
        statusText = "CONFIRMED";
      } else if (paymentMethod === "card") {
        ref = `Card ending in ${cardNumber.slice(-4) || "4092"}`;
        statusText = "CONFIRMED";
      } else if (paymentMethod === "venmo") {
        ref = "Venmo / Apple Pay Direct";
        statusText = "CONFIRMED";
      }

      const ticket: IssuedTicket = {
        ticketCode: code,
        passName: activePass.name,
        quantity,
        totalPrice,
        attendeeName: name,
        phone,
        email: email || "Registered via Phone",
        paymentMethod:
          paymentMethod === "gate"
            ? "Reserve Online — Pay at Gate (Cash or Card)"
            : paymentMethod === "cashapp"
            ? "Cash App ($ExclusiveSliding)"
            : paymentMethod === "card"
            ? "Credit / Debit Card Online"
            : "Venmo / Apple Pay",
        paymentRef: ref,
        status: statusText,
        dateIssued: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      };

      setIssuedTicket(ticket);
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <section className="relative bg-black text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/80">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/40 bg-red-950/40 px-4 py-1.5 text-xs font-mono text-red-400 uppercase tracking-widest mb-4">
            <Sparkles className="size-4 text-red-500 animate-pulse" />
            Online Ticket & Pass Reservation
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white font-mono">
            Get Online Passes & Gate Reservations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Reserve your ticket online now and pay cash or card at the entrance gate, or complete your payment online via Cash App ($jaydenmilliee07) or credit card.
          </p>
        </div>

        {/* Display Digital Ticket if Issued */}
        {issuedTicket ? (
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-red-600/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl shadow-red-950/30">
            <div className="text-center border-b border-zinc-800 pb-6">
              <div className="inline-flex items-center justify-center size-14 rounded-full bg-amber-950 text-amber-400 border border-amber-600/50 mb-3">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                Ticket Reserved! Show & Pay at the Gate
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                Your spot is locked in. Show this digital pass at the entrance gate and pay your <span className="text-amber-400 font-bold">${issuedTicket.totalPrice}</span> balance upon arrival.
              </p>
            </div>

            {/* Ticket Graphic Card */}
            <div className="mt-6 rounded-xl bg-gradient-to-br from-zinc-900 via-black to-zinc-950 border border-zinc-800 p-5 sm:p-6 relative overflow-hidden shadow-inner">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800/80 pb-4 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-semibold block">
                    EXCLUSIVE SLIDING • GATE PASS
                  </span>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tight mt-0.5">
                    {issuedTicket.passName}
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    Qty: {issuedTicket.quantity} Pass{issuedTicket.quantity > 1 ? "es" : ""} | Amount Due at Gate: <span className="text-amber-400 font-bold">${issuedTicket.totalPrice}</span>
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 text-right">
                  <span className="text-[9px] text-zinc-500 uppercase block font-mono">Pass Code</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-mono font-bold text-red-400">{issuedTicket.ticketCode}</span>
                    <button
                      onClick={handleCopyTicketCode}
                      className="text-zinc-400 hover:text-white transition-colors"
                      title="Copy Pass Code"
                    >
                      {copiedTicketCode ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Reservation Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-b border-zinc-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Attendee Name</span>
                  <span className="font-semibold text-white">{issuedTicket.attendeeName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Phone Contact</span>
                  <span className="font-semibold text-white">{issuedTicket.phone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Payment Option</span>
                  <span className="font-semibold text-amber-400">{issuedTicket.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block">Pass Status</span>
                  <span className="font-mono text-emerald-400 text-xs font-bold">{issuedTicket.status}</span>
                </div>
              </div>

              {/* QR Code & Action Bar */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-lg shrink-0">
                    <QrCode className="size-14 text-black" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold block flex items-center gap-1">
                      <MapPin className="size-3.5 inline text-amber-400" /> Pay Cash or Card at Entrance
                    </span>
                    <p className="text-[11px] text-zinc-400 max-w-xs mt-0.5">
                      Present pass code <span className="font-mono text-white">{issuedTicket.ticketCode}</span> at the main gate.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Download className="size-3.5" /> Save Pass
                  </button>
                  <a
                    href={`sms:8128008244?body=Hi Crew, I reserved pass code ${issuedTicket.ticketCode} for ${issuedTicket.attendeeName} to pay at gate.`}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
                  >
                    <Share2 className="size-3.5" /> Text Crew
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIssuedTicket(null)}
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white underline transition-colors"
              >
                ← Reserve Another Ticket Pass
              </button>
            </div>
          </div>
        ) : (
          /* Pass Selector & Reservation Flow */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step 1: Ticket Options */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2 font-mono">
                <Ticket className="size-5 text-red-500" /> 1. Select Your Ticket Level
              </h3>

              <div className="space-y-3">
                {PASS_OPTIONS.map((pass) => {
                  const isSelected = pass.id === selectedPassId;
                  return (
                    <div
                      key={pass.id}
                      onClick={() => setSelectedPassId(pass.id)}
                      className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 relative ${
                        isSelected
                          ? "border-red-600 bg-zinc-900/90 shadow-lg shadow-red-950/30 ring-1 ring-red-600"
                          : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                      }`}
                    >
                      {pass.popular && (
                        <span className="absolute -top-2.5 right-4 rounded-full bg-red-600 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-white shadow">
                          {pass.badge}
                        </span>
                      )}

                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold text-white uppercase">{pass.name}</h4>
                            {!pass.popular && (
                              <span className="text-[9px] font-mono rounded bg-zinc-800 px-2 py-0.5 text-zinc-300 uppercase">
                                {pass.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400 mt-0.5">{pass.description}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xl font-bold font-mono text-red-500">${pass.price}</span>
                          <span className="text-[10px] text-zinc-500 block">/ pass</span>
                        </div>
                      </div>

                      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-zinc-300 border-t border-zinc-800/80 pt-2.5">
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

              {/* Quantity Counter */}
              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white uppercase block font-mono">Number of Passes</span>
                  <span className="text-[11px] text-zinc-400">Select pass quantity</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-700 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="size-7 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center transition-colors text-sm"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono font-bold text-base text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="size-7 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center transition-colors text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Payment / Gate Reservation Form */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 shadow-xl">
                <h3 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2 font-mono mb-4 border-b border-zinc-800 pb-3">
                  <CreditCard className="size-5 text-red-500" /> 2. Choose Payment Method
                </h3>

                {/* Total Summary */}
                <div className="rounded-lg bg-zinc-900/90 border border-zinc-800 p-3.5 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 font-mono uppercase">{activePass.name} (x{quantity})</span>
                    <span className="font-mono text-white">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-base font-bold border-t border-zinc-800 mt-2 pt-2">
                    <span className="text-white uppercase font-mono">Total Due</span>
                    <span className="font-mono text-amber-400">${totalPrice}</span>
                  </div>
                </div>

                {/* Payment Option Tabs */}
                <div className="space-y-2 mb-4">
                  <label className="text-[10px] font-mono uppercase text-zinc-400 block">Select Payment Option</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("gate")}
                      className={`p-2.5 rounded-lg border text-xs font-mono uppercase font-bold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === "gate"
                          ? "border-amber-500 bg-amber-950/90 text-amber-300 ring-1 ring-amber-500"
                          : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <Ticket className="size-4 text-amber-400" /> Reserve & Pay at Gate
                    </button>

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
                  </div>
                </div>

                <form onSubmit={handleCheckout} className="space-y-3">
                  {/* Gate Reservation Notice */}
                  {paymentMethod === "gate" && (
                    <div className="rounded-xl border border-amber-500/50 bg-amber-950/40 p-3.5 space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase font-mono">
                        <MapPin className="size-4" /> Reserve Online — Show & Pay at Gate
                      </div>
                      <p className="text-zinc-300 text-[11px] leading-relaxed">
                        Reserve your pass online instantly. Bring your pass code or QR badge to the entrance gate and pay <strong className="text-amber-300">${totalPrice}</strong> in cash or card upon arrival.
                      </p>
                    </div>
                  )}

                  {/* Cash App Instructions */}
                  {paymentMethod === "cashapp" && (
                    <div className="rounded-xl border border-emerald-600/40 bg-emerald-950/30 p-3.5 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-emerald-400 font-bold uppercase">Cash App:</span>
                        <button
                          type="button"
                          onClick={handleCopyCashApp}
                          className="inline-flex items-center gap-1 font-mono text-white bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-600/50 text-[10px]"
                        >
                          $jaydenmilliee07 {copiedCashApp ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={cashAppTag}
                        onChange={(e) => setCashAppTag(e.target.value)}
                        placeholder="Your Cash App handle ($Cashtag)"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-1.5 text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  )}

                  {/* Card Fields */}
                  {paymentMethod === "card" && (
                    <div className="space-y-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 text-xs">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="Card Number (4000 1234 5678 9010)"
                        className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-white font-mono placeholder:text-zinc-600 focus:outline-none"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 text-white font-mono placeholder:text-zinc-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="CVC"
                          className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 text-white font-mono placeholder:text-zinc-600 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={cardZip}
                          onChange={(e) => setCardZip(e.target.value)}
                          placeholder="Zip"
                          className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 text-white font-mono placeholder:text-zinc-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Venmo */}
                  {paymentMethod === "venmo" && (
                    <div className="rounded-xl border border-sky-600/40 bg-sky-950/30 p-3 text-xs text-zinc-300">
                      Transfer <strong>${totalPrice}</strong> to Venmo <span className="font-mono text-white font-bold">@jayden-miller-67</span>.
                    </div>
                  )}

                  {/* Customer Info */}
                  <div className="space-y-2 pt-1">
                    <label className="text-[10px] font-mono uppercase text-zinc-400 block">Attendee Details</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name (Required)"
                      className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number (Required for SMS Pass)"
                      className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address (Optional)"
                      className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full mt-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 font-mono"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Pass...
                      </span>
                    ) : paymentMethod === "gate" ? (
                      <>
                        Reserve Ticket & Pay at Gate (${totalPrice}) <ArrowRight className="size-4" />
                      </>
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
      </div>
    </section>
  );
}
