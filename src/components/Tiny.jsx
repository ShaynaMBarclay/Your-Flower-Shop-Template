export default function Tiny({ title, value }) {
  return (
    <div className="tiny">
      <div className="tinyTitle">{title}</div>
      <div className="tinyValue">{value}</div>
    </div>
  );
}
