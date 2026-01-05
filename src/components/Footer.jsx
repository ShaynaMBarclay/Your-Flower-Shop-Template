export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footerInner">
        <div>
          <div className="footerTitle">Gul-e-Mariam</div>
          <p className="muted">Persian-inspired floral arrangements, crafted with care.</p>
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
