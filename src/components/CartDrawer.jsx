import { formatMoney } from "../utils/money";

function Row({ label, value }) {
  return (
    <div className="row">
      <div>{label}</div>
      <div>{value}</div>
    </div>
  );
}

export default function CartDrawer({
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
                    <div className="muted">
                      {formatMoney(product.price)} • {product.category}
                    </div>

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

                  <div className="cartLineTotal">{formatMoney(product.price * qty)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="drawerFoot">
          <div className="totals">
            <Row label="Subtotal" value={formatMoney(subtotal)} />
            <Row label="Shipping" value={formatMoney(shipping)} />
            <Row label="Tax (mock)" value={formatMoney(tax)} />
            <div className="totalsDivider" />
            <Row label={<b>Total</b>} value={<b>{formatMoney(total)}</b>} />
          </div>

          <div className="drawerActions">
            <button className="btn" onClick={onClear} type="button" disabled={!cartItems.length}>
              Clear
            </button>
            <button
              className=""
              onClick={onCheckout}
              type="button"
              disabled={!cartItems.length}
            >
              Mock Checkout
            </button>
          </div>

          <div className="drawerNote muted">Demo only — add Stripe/Shopify later.</div>
        </div>
      </aside>
    </div>
  );
}
