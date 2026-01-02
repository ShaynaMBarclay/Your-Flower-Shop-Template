import { useMemo, useState } from "react";
import "./styles/App.css";

const PRODUCTS = [
  {
    id: "rose-sheaf",
    name: "Rose Sheaf",
    price: 68,
    category: "Bouquets",
    colorTag: "Crimson",
    img: "https://images.unsplash.com/photo-1542382257-80dedb725088?auto=format&fit=crop&w=1200&q=80",
    desc: "Velvety roses with greenery, wrapped in soft linen tones.",
  },
  {
    id: "saffron-sunrise",
    name: "Saffron Sunrise",
    price: 82,
    category: "Bouquets",
    colorTag: "Saffron",
    img: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1200&q=80",
    desc: "Golden blooms with warm accents inspired by Persian sunrise hues.",
  },
  {
    id: "tulip-noor",
    name: "Tulip Noor",
    price: 58,
    category: "Seasonal",
    colorTag: "Blush",
    img: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?auto=format&fit=crop&w=1200&q=80",
    desc: "A soft tulip bundle—light, airy, and perfectly giftable.",
  },
  {
    id: "garden-mina",
    name: "Garden Mina",
    price: 95,
    category: "Arrangements",
    colorTag: "Emerald",
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
    desc: "Lush garden-style arrangement in a keepsake vase.",
  },
  {
    id: "naranj-bloom",
    name: "Naranj Bloom",
    price: 74,
    category: "Seasonal",
    colorTag: "Citrus",
    img: "https://images.unsplash.com/photo-1487073240288-854ac3a398c0?auto=format&fit=crop&w=1200&q=80",
    desc: "Bright citrus tones for celebrations and new beginnings.",
  },
  {
    id: "midnight-jasmin",
    name: "Midnight Jasmin",
    price: 88,
    category: "Arrangements",
    colorTag: "Indigo",
    img: "https://images.unsplash.com/photo-1545231097-cbd796f1d95a?auto=format&fit=crop&w=1200&q=80",
    desc: "Moody, elegant florals with a night-garden feel.",
  },
];

const CATEGORIES = ["All", "Bouquets", "Arrangements", "Seasonal"];

function formatMoney(n) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

function clampQty(q) {
  const num = Number(q);
  if (Number.isNaN(num)) return 1;
  return Math.max(1, Math.min(99, Math.floor(num)));
}

export default function App() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);

  // cart: { [id]: qty }
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  // checkout options
  const [deliveryMode, setDeliveryMode] = useState("ship"); // ship | pickup
  const [zip, setZip] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [giftNote, setGiftNote] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchesCat = category === "All" ? true : p.category === category;
      const matchesQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.colorTag.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [category, query]);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return null;
        return { product, qty };
      })
      .filter(Boolean);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  }, [cartItems]);

  const shipping = useMemo(() => {
    if (deliveryMode !== "ship") return 0;
    if (!cartItems.length) return 0;
    // simple mock logic:
    // - base 12
    // - zip present => pretend "local delivery" discount
    const base = 12;
    const localDiscount = zip.trim().length >= 5 ? 4 : 0;
    return Math.max(0, base - localDiscount);
  }, [deliveryMode, zip, cartItems.length]);

  const tax = useMemo(() => {
    // simple mock tax: 6%
    return Math.round(subtotal * 0.06 * 100) / 100;
  }, [subtotal]);

  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  function addToCart(productId, qty = 1) {
    setCart((prev) => {
      const next = { ...prev };
      next[productId] = clampQty((next[productId] || 0) + qty);
      return next;
    });
    setDrawerOpen(true);
  }

  function setQty(productId, qty) {
    const q = clampQty(qty);
    setCart((prev) => ({ ...prev, [productId]: q }));
  }

  function removeFromCart(productId) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  function clearCart() {
    setCart({});
  }

  function mockCheckout() {
    // This is a mock: you’d hook this to Stripe/Shopify/etc later.
    const summary = {
      deliveryMode,
      zip: deliveryMode === "ship" ? zip : null,
      deliveryDate: deliveryDate || null,
      giftNote: giftNote || null,
      items: cartItems.map(({ product, qty }) => ({ name: product.name, qty, price: product.price })),
      subtotal,
      shipping,
      tax,
      total,
    };

    alert("Mock checkout complete!\n\n" + JSON.stringify(summary, null, 2));
    clearCart();
    setDrawerOpen(false);
  }

  return (
    <div className="page">
      <TopBar
        cartCount={cartItems.reduce((n, it) => n + it.qty, 0)}
        onCart={() => setDrawerOpen(true)}
      />

      <Header />

      <main>
        <section className="container hero">
          <div className="heroCard">
            <div className="heroKicker">Persian-inspired florals • Gift-ready • Hand-crafted</div>
            <h1 className="heroTitle">Gul-e-Mariam</h1>
            <p className="heroSub">
              Elegant arrangements with a soft Persian influence—rich colors, delicate textures, and
              a touch of poetry in every stem.
            </p>

            <div className="heroActions">
              <a className="btn primary" href="#shop">
                Shop Florals
              </a>
              <a className="btn" href="#shipping">
                Shipping & Delivery
              </a>
            </div>

            <div className="heroBadges">
              <Badge title="Same-day options" desc="Local delivery mock" />
              <Badge title="Gift notes" desc="Add a message" />
              <Badge title="Secure checkout" desc="Mock flow" />
            </div>
          </div>

          <div className="heroImage" aria-hidden="true">
            <div className="heroPattern" />
            <div className="heroImageInner">
              <img
                src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1400&q=80"
                alt="Florals hero placeholder"
              />
            </div>
          </div>
        </section>

        <section id="shop" className="container section">
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">Shop Florals</h2>
              <p className="sectionSub">
                Browse signature bouquets, seasonal stems, and vase arrangements—priced and ready to
                ship or pick up.
              </p>
            </div>

            <div className="controls">
              <div className="segmented" role="tablist" aria-label="Categories">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={`segBtn ${category === c ? "active" : ""}`}
                    onClick={() => setCategory(c)}
                    type="button"
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="search">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search bouquets, colors, seasonal…"
                  aria-label="Search products"
                />
              </div>
            </div>
          </div>

          <div className="grid">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={() => setActiveProduct(p)}
                onAdd={() => addToCart(p.id, 1)}
              />
            ))}
          </div>
        </section>

        <section id="shipping" className="container section">
          <div className="shippingWrap">
            <div className="shippingCard">
              <h2 className="sectionTitle">Shipping & Delivery</h2>
              <p className="sectionSub">
                Toggle between <b>Shipping</b> and <b>Pickup</b>. This is a mock checkout panel you
                can show your client.
              </p>

              <div className="toggleRow">
                <button
                  className={`toggleBtn ${deliveryMode === "ship" ? "active" : ""}`}
                  onClick={() => setDeliveryMode("ship")}
                  type="button"
                >
                  Ship Flowers
                </button>
                <button
                  className={`toggleBtn ${deliveryMode === "pickup" ? "active" : ""}`}
                  onClick={() => setDeliveryMode("pickup")}
                  type="button"
                >
                  Store Pickup
                </button>
              </div>

              <div className="formGrid">
                {deliveryMode === "ship" ? (
                  <label className="field">
                    <span>Delivery ZIP Code</span>
                    <input
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="e.g., 20852"
                    />
                    <small>Mock: ZIP applies a “local delivery” discount.</small>
                  </label>
                ) : (
                  <div className="pickupInfo">
                    <div className="pill">Pickup Location</div>
                    <p className="muted">
                      Gul-e-Mariam Floral Studio<br />
                      123 Placeholder St, Your City
                    </p>
                  </div>
                )}

                <label className="field">
                  <span>Preferred Date</span>
                  <input
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    type="date"
                  />
                  <small>Mock: no real availability checks yet.</small>
                </label>

                <label className="field full">
                  <span>Gift Note (Optional)</span>
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Write a short note to include with the flowers…"
                    rows={4}
                  />
                </label>
              </div>

              <div className="callout">
                <div className="calloutTitle">Persian Touch</div>
                <p className="muted">
                  Add subtle motifs, refined typography, jewel tones, and elegant spacing—so it feels
                  inspired without being overly literal.
                </p>
              </div>
            </div>

            <div className="shippingAside">
              <div className="asideCard">
                <div className="asideTitle">Why Gul-e-Mariam?</div>
                <ul className="bullets">
                  <li>Signature bouquets with a luxurious, gift-ready wrap</li>
                  <li>Clear pricing + quick add-to-cart</li>
                  <li>Shipping/pickup toggle for modern ordering</li>
                  <li>Room for “Wedding & Events” and “Custom Orders” later</li>
                </ul>
                <a className="btn primary wide" href="#shop">
                  Explore Arrangements
                </a>
              </div>

              <div className="asideCard subtle">
                <div className="ornament" aria-hidden="true" />
                <p className="muted">
                  “Where petals meet poetry.”
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {activeProduct && (
        <Modal onClose={() => setActiveProduct(null)}>
          <div className="modalGrid">
            <div className="modalImg">
              <img src={activeProduct.img} alt={activeProduct.name} />
            </div>
            <div className="modalInfo">
              <div className="pill">{activeProduct.category}</div>
              <h3 className="modalTitle">{activeProduct.name}</h3>
              <div className="modalPrice">{formatMoney(activeProduct.price)}</div>
              <p className="muted">{activeProduct.desc}</p>

              <div className="modalRow">
                <button
                  className="btn primary"
                  onClick={() => addToCart(activeProduct.id, 1)}
                  type="button"
                >
                  Add to Cart
                </button>
                <button className="btn" onClick={() => setActiveProduct(null)} type="button">
                  Close
                </button>
              </div>

              <div className="divider" />

              <div className="tinyGrid">
                <Tiny title="Care" value="Fresh stems, keep cool" />
                <Tiny title="Wrap" value="Gift-ready mock" />
                <Tiny title="Note" value="Add a message" />
              </div>
            </div>
          </div>
        </Modal>
      )}

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        deliveryMode={deliveryMode}
        zip={zip}
        onQty={setQty}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={mockCheckout}
      />
    </div>
  );
}

function TopBar({ cartCount, onCart }) {
  return (
    <div className="topbar">
      <div className="container topbarInner">
        <div className="topbarLeft">
          <span className="topbarMark" aria-hidden="true">✦</span>
          <span>Gul-e-Mariam — Floral Studio</span>
        </div>
        <div className="topbarRight">
          <a className="topLink" href="#shop">Shop</a>
          <a className="topLink" href="#shipping">Delivery</a>
          <button className="cartBtn" onClick={onCart} type="button">
            Cart <span className="cartPill">{cartCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="headerPattern" aria-hidden="true" />
      <div className="container headerInner">
        <div className="brand">
          <div className="brandSeal" aria-hidden="true">
            <div className="sealInner">GM</div>
          </div>
          <div>
            <div className="brandName">Gul-e-Mariam</div>
            <div className="brandTag">Persian-inspired florals • Shipping available</div>
          </div>
        </div>

        <nav className="nav">
          <a href="#shop">Florals</a>
          <a href="#shipping">Shipping</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

function Badge({ title, desc }) {
  return (
    <div className="badge">
      <div className="badgeTitle">{title}</div>
      <div className="badgeDesc">{desc}</div>
    </div>
  );
}

function ProductCard({ product, onQuickView, onAdd }) {
  return (
    <article className="card">
      <button className="cardImgBtn" onClick={onQuickView} type="button" aria-label={`Quick view ${product.name}`}>
        <img src={product.img} alt={product.name} loading="lazy" />
        <div className="cardOverlay">
          <div className="pill">{product.colorTag}</div>
        </div>
      </button>

      <div className="cardBody">
        <div className="cardTop">
          <div>
            <div className="cardTitle">{product.name}</div>
            <div className="cardMeta">{product.category}</div>
          </div>
          <div className="price">{formatMoney(product.price)}</div>
        </div>

        <p className="cardDesc">{product.desc}</p>

        <div className="cardActions">
          <button className="btn primary" onClick={onAdd} type="button">Add</button>
          <button className="btn" onClick={onQuickView} type="button">Details</button>
        </div>
      </div>
    </article>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modalBackdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="Close modal" type="button">
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function Tiny({ title, value }) {
  return (
    <div className="tiny">
      <div className="tinyTitle">{title}</div>
      <div className="tinyValue">{value}</div>
    </div>
  );
}

function CartDrawer({
  open,
  onClose,
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
  deliveryMode,
  zip,
  onQty,
  onRemove,
  onClear,
  onCheckout,
}) {
  return (
    <div className={`drawerBackdrop ${open ? "open" : ""}`} onMouseDown={onClose}>
      <aside className={`drawer ${open ? "open" : ""}`} onMouseDown={(e) => e.stopPropagation()}>
        <div className="drawerHead">
          <div>
            <div className="drawerTitle">Your Cart</div>
            <div className="drawerSub">
              {deliveryMode === "ship" ? (
                <span className="muted">
                  Shipping selected {zip?.trim() ? `• ZIP ${zip.trim()}` : ""}
                </span>
              ) : (
                <span className="muted">Pickup selected</span>
              )}
            </div>
          </div>
          <button className="iconBtn" onClick={onClose} type="button" aria-label="Close cart">
            ×
          </button>
        </div>

        <div className="drawerBody">
          {!cartItems.length ? (
            <div className="empty">
              <div className="emptyTitle">Cart is empty</div>
              <p className="muted">Add an arrangement to see shipping + totals.</p>
            </div>
          ) : (
            <div className="cartList">
              {cartItems.map(({ product, qty }) => (
                <div key={product.id} className="cartRow">
                  <img className="cartThumb" src={product.img} alt={product.name} />
                  <div className="cartInfo">
                    <div className="cartName">{product.name}</div>
                    <div className="muted">{formatMoney(product.price)} • {product.category}</div>

                    <div className="qtyRow">
                      <label className="qty">
                        <span className="srOnly">Quantity</span>
                        <input
                          value={qty}
                          onChange={(e) => onQty(product.id, e.target.value)}
                          inputMode="numeric"
                        />
                      </label>
                      <button className="linkBtn" onClick={() => onRemove(product.id)} type="button">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="cartLineTotal">
                    {formatMoney(product.price * qty)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="drawerFoot">
          <div className="totals">
            <Row label="Subtotal" value={formatMoney(subtotal)} />
            <Row label="Shipping" value={shipping ? formatMoney(shipping) : formatMoney(0)} />
            <Row label="Tax (mock)" value={formatMoney(tax)} />
            <div className="totalsDivider" />
            <Row label={<b>Total</b>} value={<b>{formatMoney(total)}</b>} />
          </div>

          <div className="drawerActions">
            <button className="btn" onClick={onClear} type="button" disabled={!cartItems.length}>
              Clear
            </button>
            <button
              className="btn primary"
              onClick={onCheckout}
              type="button"
              disabled={!cartItems.length}
            >
              Mock Checkout
            </button>
          </div>

          <div className="drawerNote muted">
            Demo only — add Stripe/Shopify later.
          </div>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="row">
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footerInner">
        <div>
          <div className="footerTitle">Gul-e-Mariam</div>
          <p className="muted">
            Persian-inspired floral arrangements, crafted with care.
          </p>
          <div className="footerSmall muted">© {new Date().getFullYear()} Gul-e-Mariam</div>
        </div>

        <div className="footerCols">
          <div className="footerCol">
            <div className="footerHead">Shop</div>
            <a href="#shop">Florals</a>
            <a href="#shipping">Shipping</a>
            <a href="#shipping">Pickup</a>
          </div>

          <div className="footerCol">
            <div className="footerHead">Contact</div>
            <span className="muted">hello@gul-e-mariam.com</span>
            <span className="muted">(555) 123-4567</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
