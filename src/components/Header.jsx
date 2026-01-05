import { Link } from "react-router-dom";

export default function Header() {
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
          <Link to="/collection">Collection</Link>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
