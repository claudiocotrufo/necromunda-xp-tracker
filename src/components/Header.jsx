export default function Header({ activeBattle }) {
  return (
    <div className="header">
      <div>
        <div className="header-title">
          N26 // <span>XP</span> TRACKER
        </div>
        <div className="header-badge">NECROMUNDA 2026 // CAMPAIGN MANAGEMENT SYSTEM</div>
      </div>
      <div className="header-badge">
        {activeBattle ? `[ ⚔ ${activeBattle.name} ]` : '[ NO ACTIVE BATTLE ]'}
      </div>
    </div>
  );
}
