import { Link } from "react-router-dom";
import icon from "../assets/icon.png";


export default function Header() {
  return (
    <header className="header">
      <div className="headerPattern" aria-hidden="true" />
      <div className="container headerInner">
        <div className="brand">
          <div className="brandSeal">
          <img src={icon} alt="Brand icon" className="brandIcon" />
          </div>
          <div>
            <div className="brandName">Your Flower Shop</div>
            <div className="brandTag">Placeholder Text • Shipping available</div>
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
