import { Routes, Route } from "react-router-dom";
import { useMemo, useState } from "react";

import Home from "./pages/Home";
import Collection from "./pages/Collections";

import { PRODUCTS } from "./data/products";
import { clampQty } from "./utils/cart";

import CartDrawer from "./components/CartDrawer";

import "./styles/index.css";


export default function App() {
  const [activeProduct, setActiveProduct] = useState(null);

  // cart: { [id]: qty }
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  // checkout options
  const [deliveryMode, setDeliveryMode] = useState("ship"); // ship | pickup
  const [zip, setZip] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [giftNote, setGiftNote] = useState("");

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
    const base = 12;
    const localDiscount = zip.trim().length >= 5 ? 4 : 0;
    return Math.max(0, base - localDiscount);
  }, [deliveryMode, zip, cartItems.length]);

  const tax = useMemo(() => {
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

  const cartCount = cartItems.reduce((n, it) => n + it.qty, 0);

  const shared = {
    // cart + UI
    cartCount,
    cartItems,
    drawerOpen,
    setDrawerOpen,

    // product modal
    activeProduct,
    setActiveProduct,

    // actions
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    mockCheckout,

    // totals
    subtotal,
    shipping,
    tax,
    total,

    // delivery form state
    deliveryMode,
    setDeliveryMode,
    zip,
    setZip,
    deliveryDate,
    setDeliveryDate,
    giftNote,
    setGiftNote,
  };

 
return (
  <>
    <Routes>
      <Route path="/" element={<Home {...shared} />} />
      <Route path="/collection" element={<Collection {...shared} />} />
    </Routes>

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
  </>
);
}
