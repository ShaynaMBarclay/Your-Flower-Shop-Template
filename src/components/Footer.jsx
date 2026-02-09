export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container footerInner">
        <div>
          <div className="footerTitle">Your Flower Shop</div>
          <p className="muted">floral arrangements, crafted with care.</p>
          <div className="footerSmall muted">© {new Date().getFullYear()} Your Flower Shop </div>
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
            <span className="muted">hello@you-email-here.com</span>
            <span className="muted">(555) 123-4567</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
