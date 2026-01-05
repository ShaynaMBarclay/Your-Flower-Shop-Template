import { formatMoney } from "../utils/money";

export default function ProductCard({ product, onQuickView, onAdd }) {
  return (
    <article className="card">
      <button
        className="cardImgBtn"
        onClick={onQuickView}
        type="button"
        aria-label={`Quick view ${product.name}`}
      >
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
          <button className="btn primary" onClick={onAdd} type="button">
            Add
          </button>
          <button className="btn" onClick={onQuickView} type="button">
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
