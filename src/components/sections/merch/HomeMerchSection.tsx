"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Shirt,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Check,
  Copy
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "apparel" | "headwear" | "accessories";
  price: number;
  badge?: string;
  description: string;
  colors: string[];
  sizes: string[];
  features: string[];
  gradient: string;
  iconType: "hoodie" | "tee" | "cap" | "jacket" | "decal" | "lanyard";
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "hoodie-01",
    name: "Exclusive Sliding Heavyweight Hoodie",
    category: "apparel",
    price: 65,
    badge: "BEST SELLER",
    description: "450 GSM fleece hoodie featuring 3D raised chest embroidery and sleeve drift graphics.",
    colors: ["Pitch Black", "Flame Red"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    features: ["450 GSM Heavy Fleece", "3D Raised Embroidery", "Double-layered hood"],
    gradient: "from-zinc-900 to-red-950",
    iconType: "hoodie"
  },
  {
    id: "tee-01",
    name: "Exclusive Sliding Trackside Tee",
    category: "apparel",
    price: 35,
    badge: "CREW FAVORITE",
    description: "100% carded heavyweight cotton t-shirt with tire smoke particle chest logo.",
    colors: ["Matte Black", "Ash Gray"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    features: ["100% Carded Heavy Cotton", "High-density screen print", "Reinforced collar"],
    gradient: "from-zinc-900 to-zinc-950",
    iconType: "tee"
  },
  {
    id: "cap-01",
    name: "Pit Crew Structured Snapback",
    category: "headwear",
    price: 30,
    badge: "LIMITED",
    description: "6-panel structured flat brim snapback cap with raised 3D logo embroidery.",
    colors: ["Stealth Black", "Red Brim"],
    sizes: ["Adjustable"],
    features: ["Raised 3D Emblem", "Custom Satin Crown", "Heavy snap closure"],
    gradient: "from-zinc-950 to-red-900/60",
    iconType: "cap"
  }
];

export default function HomeMerchSection() {
  const [productSelections, setProductSelections] = useState<
    Record<string, { color: string; size: string }>
  >({
    "hoodie-01": { color: "Pitch Black", size: "L" },
    "tee-01": { color: "Matte Black", size: "L" },
    "cap-01": { color: "Stealth Black", size: "Adjustable" }
  });

  const [orderedItem, setOrderedItem] = useState<{
    name: string;
    price: number;
    color: string;
    size: string;
    code: string;
  } | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [copiedCashApp, setCopiedCashApp] = useState(false);

  const updateSelection = (productId: string, key: "color" | "size", val: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || { color: "", size: "" }),
        [key]: val
      }
    }));
  };

  const handleOrderMerch = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleConfirmMerchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !name || !phone) {
      alert("Please enter your full name and phone number to order gear.");
      return;
    }

    const sel = productSelections[selectedProduct.id] || {
      color: selectedProduct.colors[0],
      size: selectedProduct.sizes[0]
    };

    const code = `ES-GEAR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderedItem({
      name: selectedProduct.name,
      price: selectedProduct.price,
      color: sel.color,
      size: sel.size,
      code
    });
    setSelectedProduct(null);
  };

  const handleCopyCashApp = () => {
    navigator.clipboard.writeText("$ExclusiveSliding");
    setCopiedCashApp(true);
    setTimeout(() => setCopiedCashApp(false), 2500);
  };

  return (
    <section className="relative bg-zinc-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-600/40 bg-red-950/40 px-4 py-1.5 text-xs font-mono text-red-400 uppercase tracking-widest mb-3">
              <ShoppingBag className="size-4 text-red-500" />
              Official Exclusive Sliding Merchandise
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white font-mono">
              Exclusive Sliding Gear & Apparel
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl">
              Heavyweight hoodies, pit crew graphic tees, and snapback caps. Grab your gear on the front page or view the full catalog.
            </p>
          </div>

          <a
            href="/merch"
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 uppercase text-xs font-mono tracking-wider transition-colors shrink-0 shadow-lg shadow-red-950/40"
          >
            Explore Full Gear Shop <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Order Success Modal / Banner */}
        {orderedItem && (
          <div className="mb-8 rounded-2xl border-2 border-emerald-500/80 bg-zinc-900 p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="size-8 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">
                    Merch Order Logged! Order #{orderedItem.code}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Item: <span className="text-white font-semibold">{orderedItem.name}</span> ({orderedItem.color} / {orderedItem.size}) — ${orderedItem.price}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOrderedItem(null)}
                className="text-xs font-mono text-zinc-400 hover:text-white underline"
              >
                Close Notice
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-300">
              <p>
                Pay via Cash App <span className="text-emerald-400 font-bold">$ExclusiveSliding</span> or present order code <strong className="text-white">{orderedItem.code}</strong> at the merchandise table.
              </p>
              <button
                onClick={handleCopyCashApp}
                className="inline-flex items-center gap-1.5 bg-emerald-950 border border-emerald-600/50 text-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-900 transition-colors"
              >
                <Zap className="size-3.5" /> Cash App $ExclusiveSliding {copiedCashApp ? <Check className="size-3" /> : <Copy className="size-3" />}
              </button>
            </div>
          </div>
        )}

        {/* Product Selection Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-md w-full text-white space-y-4 shadow-2xl relative">
              <div className="flex justify-between items-start border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold block">
                    EXCLUSIVE SLIDING GEAR
                  </span>
                  <h3 className="text-lg font-bold uppercase font-mono">{selectedProduct.name}</h3>
                </div>
                <span className="text-xl font-bold font-mono text-red-500">${selectedProduct.price}</span>
              </div>

              <form onSubmit={handleConfirmMerchOrder} className="space-y-3">
                <div className="text-xs text-zinc-400 space-y-1">
                  <p>
                    Selected: <span className="text-white font-semibold">
                      {productSelections[selectedProduct.id]?.color} / {productSelections[selectedProduct.id]?.size}
                    </span>
                  </p>
                  <p>Choose your payment mode: Pay cash/card at event gate or Cash App ($ExclusiveSliding).</p>
                </div>

                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name (Required)"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
                />

                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number (SMS confirmation)"
                  className="w-full rounded-lg bg-zinc-950 border border-zinc-800 px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-red-600"
                />

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="w-1/2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-xs uppercase py-3 font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase py-3 font-bold transition-colors shadow-lg shadow-red-950/40"
                  >
                    Order Merch (${selectedProduct.price})
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Featured Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_PRODUCTS.map((product) => {
            const sel = productSelections[product.id] || {
              color: product.colors[0],
              size: product.sizes[0]
            };

            return (
              <div
                key={product.id}
                className="rounded-2xl border border-zinc-800 bg-black overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className={`h-44 bg-gradient-to-br ${product.gradient} p-5 relative flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800">
                        ${product.price}
                      </span>
                      {product.badge && (
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-red-600 px-2.5 py-0.5 rounded-full shadow">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center backdrop-blur-md text-red-500">
                        {product.iconType === "hoodie" || product.iconType === "tee" ? (
                          <Shirt className="size-5" />
                        ) : (
                          <Sparkles className="size-5" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                          EXCLUSIVE SLIDING
                        </span>
                        <span className="text-xs font-bold uppercase text-white font-mono">
                          {product.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-3.5">
                    <h3 className="text-base font-bold text-white uppercase tracking-tight font-mono">{product.name}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{product.description}</p>

                    {/* Color selection */}
                    {product.colors.length > 0 && (
                      <div>
                        <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                          Color: <span className="text-white font-semibold">{sel.color}</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => updateSelection(product.id, "color", color)}
                              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                                sel.color === color
                                  ? "bg-red-600 text-white font-bold"
                                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size selection */}
                    {product.sizes.length > 0 && (
                      <div>
                        <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">
                          Size: <span className="text-white font-semibold">{sel.size}</span>
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => updateSelection(product.id, "size", size)}
                              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                                sel.size === size
                                  ? "bg-white text-black font-bold"
                                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => handleOrderMerch(product)}
                    className="w-full rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold font-mono py-2.5 px-4 uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
                  >
                    <ShoppingBag className="size-4" /> Order Gear (${product.price})
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
