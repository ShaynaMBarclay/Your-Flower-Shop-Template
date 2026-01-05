import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { PRODUCTS, CATEGORIES } from "../data/products";

import TopBar from "../components/TopBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import Tiny from "../components/Tiny";
import { formatMoney } from "../utils/money";

export default function Collection({
  cartCount,
  setDrawerOpen,

  activeProduct,
  setActiveProduct,

  addToCart,
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
        <section className="container section">
          <div className="sectionHead">
            <div>
              <h2 className="sectionTitle">Entire Collection</h2>
              <p className="sectionSub">
                Browse every arrangement, then filter by category or search by color/name.
              </p>
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn" to="/">← Back Home</Link>
              <a className="btn primary" href="#grid">Browse</a>
            </div>
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

          <div id="grid" className="grid">
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
