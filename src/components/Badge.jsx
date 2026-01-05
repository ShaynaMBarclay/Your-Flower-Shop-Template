export default function Badge({ title, desc }) {
  return (
    <div className="badge">
      <div className="badgeTitle">{title}</div>
      <div className="badgeDesc">{desc}</div>
    </div>
  );
}
