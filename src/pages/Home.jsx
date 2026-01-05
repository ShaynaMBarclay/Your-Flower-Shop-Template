import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { PRODUCTS, CATEGORIES } from "../data/products";
import { formatMoney } from "../utils/money";

import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Badge from "../components/Badge";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import Tiny from "../components/Tiny";

export default function Home({
  cartCount,
  setDrawerOpen,

  activeProduct,
  setActiveProduct,

  addToCart,

  deliveryMode,
  setDeliveryMode,
  zip,
  setZip,
  deliveryDate,
  setDeliveryDate,
  giftNote,
  setGiftNote,
}) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

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

  return (
    <div className="page">
      <TopBar cartCount={cartCount} onCart={() => setDrawerOpen(true)} />
      <Header />

      <main>
        <section className="container hero">
          <div className="heroCard">
            <div className="heroKicker">Placeholder florals • Gift-ready • Hand-crafted</div>
            <h1 className="heroTitle">Gul-e-Mariam</h1>
            <p className="heroSub">
             Your about paragraph/bio will go here
            </p>

            <div className="heroActions">
              <a className="btn primary" href="#shop">Shop Florals</a>
              <a className="btn" href="#shipping">Shipping & Delivery</a>

              <Link className="btn" to="/collection">
                View our entire collection
              </Link>
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
              <img src={PRODUCTS[1].img} alt="Florals hero placeholder" />
            </div>
          </div>
        </section>
        <section id="shop" className="container section">
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">Shop Florals</h2>
              <p className="sectionSub">
                Your floral section paragraph will go here, something to catch the eye and describe the collection
              </p>
            </div>
            <Link className="btn primary" to="/collection">
              View our entire collection
            </Link>
          </div>

          <div className="controls" style={{ marginBottom: 18 }}>
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
                Toggle between <b>Shipping</b> and <b>Pickup</b>. This is a mock checkout panel
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
                    <small>Mock: ZIP</small>
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
                 <div className="calloutTitle">Gifting Made Simple</div>
  <p className="muted">
    Choose an arrangement, select your delivery option, add a note, and we’ll take
    care of the rest. This paragraph can be changed to something else.
  </p>

              </div>
            </div>

            <div className="shippingAside">
              <div className="asideCard">
                <div className="asideTitle">Why Gul-e-Mariam? Placeholder text, can be changed</div>
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
             <div className="asideTitle">Care & Gifting Placeholder text, can be changed</div>
             <ul className="bullets">
             <li>Fresh, premium stems sourced for longevity</li>
             <li>Care instructions included with every order</li>
             <li>Complimentary gift note available at checkout</li>
             </ul>
                
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
    </div>
  );
}
