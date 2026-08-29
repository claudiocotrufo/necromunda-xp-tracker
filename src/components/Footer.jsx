export default function Footer({ onReset }) {
  return (
    <div className="footer">
      <button className="btn btn-danger btn-sm" onClick={onReset}>
        ⚠ RESET ALL DATA
      </button>
    </div>
  );
}
