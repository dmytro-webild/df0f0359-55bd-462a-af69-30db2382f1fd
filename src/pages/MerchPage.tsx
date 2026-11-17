import { useState } from "react";
import {
  ShoppingBag,
  Shirt,
  Tag,
  CreditCard,
  Zap,
  CheckCircle2,
  Phone,
  Truck,
  Sparkles,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Filter
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

const PRODUCTS: Product[] = [
  {
    id: "hoodie-01",
    name: "Exclusive Sliding Heavyweight Hoodie",
    category: "apparel",
    price: 65,
    badge: "BEST SELLER",
    description: "Ultra-dense 450 GSM fleece hoodie featuring 3D raised embroidery chest logo and sleeve drift graphics.",
    colors: ["Pitch Black", "Flame Red"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    features: ["450 GSM Heavy Fleece", "3D Raised Chest Embroidery", "Double-layered hood & deep pouch"],
    gradient: "from-zinc-900 to-red-950",
    iconType: "hoodie"
  },
  {
    id: "tee-01",
    name: "Exclusive Sliding Trackside Tee",
    category: "apparel",
    price: 35,
    badge: "CREW FAVORITE",
    description: "100% carded heavyweight cotton t-shirt with high-density tire smoke particle chest logo and rear drift print.",
    colors: ["Matte Black", "Ash Gray"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    features: ["100% Carded Heavy Cotton", "High-density screen print", "Reinforced collar stitching"],
    gradient: "from-zinc-900 to-zinc-950",
    iconType: "tee"
  },
  {
    id: "cap-01",
    name: "Pit Crew Structured Snapback",
    category: "headwear",
    price: 30,
    badge: "LIMITED",
    description: "6-panel structured flat brim snapback cap with raised 3D logo embroidery and custom satin inner liner.",
    colors: ["Stealth Black", "Red Brim"],
    sizes: ["Adjustable"],
    features: ["Raised 3D Embroidered Emblem", "Custom Satin Inner Crown", "High-durability snap enclosure"],
    gradient: "from-zinc-950 to-red-900/60",
    iconType: "cap"
  },
  {
    id: "jacket-01",
    name: "All-Weather Trackside Windbreaker",
    category: "apparel",
    price: 85,
    badge: "NEW RELEASE",
    description: "Water-resistant nylon shell with matte black finish, high-reflectivity red back logo, and thermal zip pockets.",
    colors: ["Matte Black"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    features: ["Water-resistant nylon shell", "High-reflectivity rear print", "Storm-proof sealed zips"],
    gradient: "from-zinc-900 via-red-950 to-black",
    iconType: "jacket"
  },
  {
    id: "decal-01",
    name: "Holographic Decal 6-Pack",
    category: "accessories",
    price: 15,
    description: "6-pack of die-cut UV and waterproof vinyl stickers for truck glass, helmets, and toolboxes.",
    colors: ["Holographic Silver", "Flame Red"],
    sizes: ["Multi-Pack"],
    features: ["UV & Weatherproof vinyl", "Die-cut precision edges", "Resistant to power washing"],
    gradient: "from-zinc-900 to-zinc-800",
    iconType: "decal"
  },
  {
    id: "lanyard-01",
    name: "VIP Pit Pass Lanyard & Tag",
    category: "accessories",
    price: 12,
    description: "Jacquard woven neck lanyard with metallic quick-release clasp and custom acrylic pit badge.",
    colors: ["Red / Black"],
    sizes: ["One Size"],
    features: ["Jacquard woven strap", "Heavy metal quick release clip", "Acrylic Exclusive Sliding emblem"],
    gradient: "from-red-950 to-zinc-950",
    iconType: "lanyard"
  }
];

interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

interface IssuedOrder {
  orderCode: string;
  items: CartItem[];
  subtotal: number;
  deliveryOption: "pickup" | "shipping";
  deliveryFee: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  date: string;
}

export default function MerchPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Per-product selections state
  const [productSelections, setProductSelections] = useState<
    Record<string, { color: string; size: string }>
  >({
    "hoodie-01": { color: "Pitch Black", size: "L" },
    "tee-01": { color: "Matte Black", size: "L" },
    "cap-01": { color: "Stealth Black", size: "Adjustable" },
    "jacket-01": { color: "Matte Black", size: "L" },
    "decal-01": { color: "Holographic Silver", size: "Multi-Pack" },
    "lanyard-01": { color: "Red / Black", size: "One Size" }
  });

  // Checkout form state
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "shipping">("pickup");
  const [paymentMethod, setPaymentMethod] = useState<"cashapp" | "card" | "venmo" | "gate">("cashapp");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [cashAppTag, setCashAppTag] = useState<string>("");

  const [copiedCashApp, setCopiedCashApp] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<IssuedOrder | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryOption === "shipping" && cart.length > 0 ? 8 : 0;
  const cartTotal = cartSubtotal + deliveryFee;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCopyCashApp = () => {
    navigator.clipboard.writeText("$ExclusiveSliding");
    setCopiedCashApp(true);
    setTimeout(() => setCopiedCashApp(false), 2500);
  };

  const updateSelection = (productId: string, key: "color" | "size", val: string) => {
    setProductSelections((prev) => ({
      ...prev,
      [productId]: {
        ...(prev[productId] || { color: "", size: "" }),
        [key]: val
      }
    }));
  };

  const handleAddToCart = (product: Product) => {
    const sel = productSelections[product.id] || {
      color: product.colors[0] || "",
      size: product.sizes[0] || ""
    };

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedColor === sel.color &&
          i.selectedSize === sel.size
      );

      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx].quantity += 1;
        return next;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedColor: sel.color,
            selectedSize: sel.size,
            quantity: 1
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, delta: number) => {
    setCart((prevCart) => {
      const next = [...prevCart];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index].quantity = newQty;
      return next;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please enter your name and phone number to complete gear order.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const code = `ES-GEAR-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: IssuedOrder = {
        orderCode: code,
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryOption,
        deliveryFee,
        total: cartTotal,
        customerName: name,
        phone,
        address: deliveryOption === "shipping" ? address || "Address provided" : "Event Gate Pickup",
        paymentMethod:
          paymentMethod === "cashapp"
            ? `Cash App ($ExclusiveSliding) ${cashAppTag ? `[${cashAppTag}]` : ""}`
            : paymentMethod === "card"
            ? "Credit Card Online"
            : paymentMethod === "venmo"
            ? "Venmo / Apple Pay"
            : "Pay at Gate",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      };

      setCompletedOrder(order);
      setCart([]);
      setIsSubmitting(false);
      setIsCartOpen(false);
      window.scrollTo({ top: 100, behavior: "smooth" });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-[5.5rem] pb-24" id="merch-page">
      {/* Top Banner / Hero Header */}
      <section className="relative overflow-hidden border-b border-zinc-800 bg-gradient-to-b from-zinc-900 via-black to-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-950/30 via-black to-black pointer-events-none" />
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-600/40 bg-red-950/50 px-4 py-1.5 text-xs sm:text-sm font-mono text-red-400 uppercase tracking-widest mb-6">
            <Sparkles className="size-4 text-red-500 animate-pulse" />
            Official Exclusive Sliding Merchandise
          </div>
          <h1 className="text-[length:min(var(--text-display),12.5vw)] font-bold tracking-tight text-white uppercase [font-family:var(--font-heading)] [font-weight:var(--heading-weight)]">
            Exclusive Sliding Gear
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto">
            Heavyweight hoodies, pit crew graphic tees, structured snapbacks, and trackside accessories. Represent Exclusive Sliding on and off the tarmac.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-mono">
            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 shadow-lg shadow-red-900/40 transition-all"
            >
              <ShoppingBag className="size-4" /> View Cart ({totalItemCount})
            </button>
            <a
              href="tel:8128008244"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-2.5 text-zinc-200 hover:border-red-500 transition-colors"
            >
              <Phone className="size-4 text-red-500" /> Crew Info: 812-800-8244
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        {/* If Order is Completed */}
        {completedOrder ? (
          <div className="mx-auto max-w-3xl rounded-2xl border-2 border-red-600/80 bg-zinc-950 p-6 sm:p-10 shadow-2xl shadow-red-950/30">
            <div className="text-center border-b border-zinc-800 pb-8">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-600/50 mb-4">
                <CheckCircle2 className="size-10" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide">
                Gear Order Confirmed!
              </h2>
              <p className="text-zinc-400 text-sm mt-1">
                Your Exclusive Sliding gear order has been logged. Order Number:{" "}
                <span className="font-mono text-red-400 font-bold">{completedOrder.orderCode}</span>
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-5">
                <h3 className="text-xs font-mono uppercase text-zinc-400 mb-3 block">Ordered Items</h3>
                <div className="space-y-3 divide-y divide-zinc-800">
                  {completedOrder.items.map((item, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 flex justify-between items-center text-sm">
                      <div>
                        <span className="font-bold text-white">{item.product.name}</span>
                        <span className="text-xs text-zinc-400 block font-mono">
                          Color: {item.selectedColor} | Size: {item.selectedSize} | Qty: {item.quantity}
                        </span>
                      </div>
                      <span className="font-mono font-bold text-zinc-200">${item.product.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-800 mt-4 pt-3 flex justify-between text-sm font-bold">
                  <span className="text-zinc-300 uppercase">
                    Total ({completedOrder.deliveryOption === "shipping" ? "With Shipping" : "Event Pickup"})
                  </span>
                  <span className="font-mono text-red-500 text-base">${completedOrder.total}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-500 uppercase block">Customer Name</span>
                  <span className="text-white font-semibold">{completedOrder.customerName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block">Phone Number</span>
                  <span className="text-white font-semibold">{completedOrder.phone}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block">Fulfilment Mode</span>
                  <span className="text-emerald-400 font-semibold uppercase">{completedOrder.deliveryOption}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block">Payment Method</span>
                  <span className="text-zinc-300 font-semibold">{completedOrder.paymentMethod}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center flex justify-center gap-4">
              <button
                onClick={() => setCompletedOrder(null)}
                className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 uppercase text-xs tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-red-500" />
                <span className="text-xs font-mono uppercase text-zinc-400">Category:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Gear" },
                    { id: "apparel", label: "Apparel (Hoodies & Tees)" },
                    { id: "headwear", label: "Headwear & Caps" },
                    { id: "accessories", label: "Accessories & Decals" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-semibold transition-colors ${
                        activeCategory === cat.id
                          ? "bg-red-600 text-white shadow-md shadow-red-950/40"
                          : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-mono text-zinc-200 hover:border-red-500 transition-colors"
              >
                <ShoppingBag className="size-4 text-red-500" /> Cart Subtotal:{" "}
                <span className="font-bold text-white">${cartSubtotal}</span>
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => {
                const sel = productSelections[product.id] || {
                  color: product.colors[0],
                  size: product.sizes[0]
                };

                return (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300 shadow-xl"
                  >
                    <div>
                      {/* Visual Header Box */}
                      <div className={`h-48 bg-gradient-to-br ${product.gradient} p-6 relative flex flex-col justify-between`}>
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
                          <div className="size-12 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center backdrop-blur-md text-red-500">
                            {product.iconType === "hoodie" || product.iconType === "tee" || product.iconType === "jacket" ? (
                              <Shirt className="size-6" />
                            ) : product.iconType === "cap" ? (
                              <Sparkles className="size-6" />
                            ) : (
                              <Tag className="size-6" />
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                              EXCLUSIVE SLIDING
                            </span>
                            <span className="text-sm font-bold uppercase text-white font-mono">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">{product.name}</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">{product.description}</p>

                        {/* Color Selector */}
                        {product.colors.length > 0 && (
                          <div>
                            <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5">
                              Color: <span className="text-white font-semibold">{sel.color}</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {product.colors.map((color) => (
                                <button
                                  key={color}
                                  type="button"
                                  onClick={() => updateSelection(product.id, "color", color)}
                                  className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
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

                        {/* Size Selector */}
                        {product.sizes.length > 0 && (
                          <div>
                            <label className="text-[10px] font-mono uppercase text-zinc-400 block mb-1.5">
                              Size: <span className="text-white font-semibold">{sel.size}</span>
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {product.sizes.map((size) => (
                                <button
                                  key={size}
                                  type="button"
                                  onClick={() => updateSelection(product.id, "size", size)}
                                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
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

                        <ul className="space-y-1 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400">
                          {product.features.map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <CheckCircle2 className="size-3 text-red-500 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className="w-full rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-3 px-4 uppercase text-xs tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40"
                      >
                        <ShoppingBag className="size-4" /> Add to Cart (${product.price})
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Slide-over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white p-6 flex flex-col justify-between shadow-2xl relative">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="size-5 text-red-500" />
                    <h2 className="text-lg font-bold uppercase tracking-wider">Your Gear Cart ({totalItemCount})</h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                  >
                    <X className="size-5" />
                  </button>
                </div>

                {/* Cart Items List */}
                {cart.length === 0 ? (
                  <div className="py-16 text-center text-zinc-500 space-y-3">
                    <ShoppingBag className="size-12 mx-auto text-zinc-700" />
                    <p className="text-sm font-mono uppercase">Your gear cart is empty</p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4 max-h-[40vh] overflow-y-auto pr-1">
                    {cart.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0">
                          <h4 className="font-bold text-white uppercase truncate">{item.product.name}</h4>
                          <span className="text-zinc-400 font-mono block mt-0.5">
                            {item.selectedColor} / {item.selectedSize}
                          </span>
                          <span className="text-red-400 font-mono font-bold">${item.product.price} each</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-zinc-950 rounded border border-zinc-800">
                            <button
                              onClick={() => updateQuantity(index, -1)}
                              className="px-2 py-1 text-zinc-400 hover:text-white"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="px-2 font-mono font-bold text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, 1)}
                              className="px-2 py-1 text-zinc-400 hover:text-white"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-zinc-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-zinc-800 pt-4 space-y-4">
                  {/* Delivery / Fulfilment Option */}
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1.5">Fulfillment Mode</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setDeliveryOption("pickup")}
                        className={`p-2 rounded-lg border text-xs font-mono uppercase font-semibold flex items-center justify-center gap-1 transition-all ${
                          deliveryOption === "pickup"
                            ? "border-emerald-500 bg-emerald-950/80 text-emerald-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        <CheckCircle2 className="size-3.5" /> Event Pickup (Free)
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeliveryOption("shipping")}
                        className={`p-2 rounded-lg border text-xs font-mono uppercase font-semibold flex items-center justify-center gap-1 transition-all ${
                          deliveryOption === "shipping"
                            ? "border-red-600 bg-red-950/80 text-red-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        <Truck className="size-3.5" /> Ship Home ($8)
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Option */}
                  <div>
                    <label className="text-[10px] font-mono text-zinc-400 uppercase block mb-1.5">Payment Option</label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cashapp")}
                        className={`p-2 rounded-lg border font-semibold flex items-center justify-center gap-1 ${
                          paymentMethod === "cashapp"
                            ? "border-emerald-500 bg-emerald-950 text-emerald-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        <Zap className="size-3.5 text-emerald-400" /> Cash App
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-2 rounded-lg border font-semibold flex items-center justify-center gap-1 ${
                          paymentMethod === "card"
                            ? "border-red-600 bg-red-950 text-red-300"
                            : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                      >
                        <CreditCard className="size-3.5 text-red-400" /> Card
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "cashapp" && (
                    <div className="rounded-lg bg-emerald-950/40 border border-emerald-600/30 p-2.5 text-[11px] space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-emerald-400 font-bold">Cash App Tag:</span>
                        <button
                          type="button"
                          onClick={handleCopyCashApp}
                          className="text-[10px] bg-emerald-900 px-2 py-0.5 rounded text-white font-mono"
                        >
                          $ExclusiveSliding {copiedCashApp ? "✓" : "Copy"}
                        </button>
                      </div>
                      <input
                        type="text"
                        value={cashAppTag}
                        onChange={(e) => setCashAppTag(e.target.value)}
                        placeholder="Your Cash App handle"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white font-mono text-xs mt-1"
                      />
                    </div>
                  )}

                  {/* Customer Info Form */}
                  <form onSubmit={handleCheckoutSubmit} className="space-y-2">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder:text-zinc-500"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number (Order SMS)"
                      className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder:text-zinc-500"
                    />
                    {deliveryOption === "shipping" && (
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Shipping Address (Street, City, Zip)"
                        className="w-full rounded-lg bg-zinc-900 border border-zinc-800 px-3 py-2 text-xs text-white placeholder:text-zinc-500"
                      />
                    )}

                    <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm font-bold">
                      <span className="uppercase">Total Due</span>
                      <span className="font-mono text-red-500 text-lg">${cartTotal}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3 uppercase text-xs tracking-wider transition-colors flex items-center justify-center gap-2 mt-2 shadow-lg shadow-red-950/40"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 font-mono">
                          <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Order...
                        </span>
                      ) : (
                        <>
                          Complete Order (${cartTotal}) <ArrowRight className="size-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
