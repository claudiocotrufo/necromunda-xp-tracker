interface FooterProps {
  onReset: () => void;
}

export default function Footer({ onReset }: FooterProps) {
  return (
    <div className="footer">
      <button className="btn btn-danger btn-sm" onClick={onReset}>
        ⚠ RESET ALL DATA
      </button>
    </div>
  );
}
