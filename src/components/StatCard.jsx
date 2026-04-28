//small reusable card for displaying a single stat like total raised, donor

export default function StatCard({ title, value }) {
  return (
    <div className="card">
      {/* Label for the stat */}
      <p className="muted">{title}</p>

      {/* Actual value (highlighted) */}
      <p className="big-number">{value}</p>
    </div>
  );
}