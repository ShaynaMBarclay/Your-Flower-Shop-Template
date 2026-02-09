import { Link } from "react-router-dom";

export default function TopBar({ cartCount, onCart }) {
  return (
    <div className="topbar">
      <div className="container topbarInner">
        <div className="topbarLeft">
          <span className="topbarMark" aria-hidden="true">✦</span>
          <span>Your Flower Shop — Floral Studio</span>
        </div>
        <div className="topbarRight">
          <a className="topLink" href="#shop">Shop</a>
          <a className="topLink" href="#shipping">Delivery</a>
          <Link className="topLink" to="/collection">Collection</Link>

          <button className="cartBtn" onClick={onCart} type="button">
            Cart <span className="cartPill">{cartCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
