import { useState } from 'react';

function HistoryFighterAccordion({ fighter, isOpen, onToggle }) {
  const rows = [
    { label: 'Participated', val: fighter.participated ? '✓' : null, xp: fighter.participated ? 1 : 0 },
    { label: 'Seriously Injured', val: fighter.seriouslyInjured || 0, xp: (fighter.seriouslyInjured || 0) * 1 },
    { label: 'Out of Action', val: fighter.outOfAction || 0, xp: (fighter.outOfAction || 0) * 2 },
    { label: 'OOA Leader/Champion', val: fighter.outOfActionChampion || 0, xp: (fighter.outOfActionChampion || 0) * 3 },
    { label: 'Assistance Recovery', val: fighter.assistance || 0, xp: fighter.assistance || 0 },
    { label: 'Mentor Bonus', val: fighter.mentor || 0, xp: fighter.mentor || 0 },
    { label: 'Controlled Objective', val: fighter.objective ? '✓' : null, xp: fighter.objective ? 1 : 0 },
  ];

  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        <span style={{ fontFamily: 'Orbitron,monospace', fontSize: '12px', color: 'var(--green)' }}>{fighter.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="summary-xp">+{fighter.earnedXP || 0} XP</span>
          <span className="text-dim" style={{ fontSize: '12px' }}>{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>

      {isOpen && (
        <div className="accordion-body">
          <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '9px', letterSpacing: '2px', color: 'var(--text-dim)', marginBottom: '10px' }}>
            // XP BREAKDOWN
          </div>
          <div style={{ display: 'flex', padding: '4px 0', marginBottom: '4px', borderBottom: '1px solid var(--green-border)' }}>
            <span style={{ fontSize: '9px', color: 'var(--text-dim)', minWidth: '28px', letterSpacing: '1px' }}>N°</span>
            <span style={{ fontSize: '9px', color: 'var(--text-dim)', flex: 1, padding: '0 12px', letterSpacing: '1px' }}>ACTION</span>
            <span style={{ fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '1px' }}>XP</span>
          </div>
          {rows.filter((r) => r.xp > 0).map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--green-border)' }}>
              <span style={{ fontFamily: 'VT323,monospace', fontSize: '18px', color: 'var(--green)', minWidth: '28px' }}>
                {r.val === '✓' ? '1' : r.val}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text)', flex: 1, padding: '0 12px' }}>{r.label}</span>
              <span style={{ fontFamily: 'VT323,monospace', fontSize: '18px', color: 'var(--amber)' }}>+{r.xp}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HistoryTab({ battles, onDeleteBattle }) {
  const [openKey, setOpenKey] = useState(null);

  if (battles.length === 0) {
    return (
      <>
        <div className="section-title">Battle Log</div>
        <div className="empty-state">
          <div className="icon">▣</div>
          <div>NO BATTLES ON RECORD</div>
        </div>
      </>
    );
  }

  const ordered = [...battles].reverse();

  return (
    <>
      <div className="section-title">Battle Log</div>
      <div>
        {ordered.map((b) => {
          const total = b.fighters.reduce((sum, f) => sum + (f.earnedXP || 0), 0);
          const s = b.scenario || {};
          const hasScenario = s.deployment || s.objective || s.sideJob || s.crew;
          const vsLine = [b.campaign, b.opponent ? 'VS ' + b.opponent : null].filter(Boolean).join(' // ');

          return (
            <div key={b.id} className="history-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontFamily: 'Orbitron,monospace', fontSize: '15px', color: 'var(--green)', fontWeight: 700, textShadow: '0 0 6px var(--green)' }}>
                    {b.name}
                  </div>
                  {vsLine && (
                    <div style={{ fontSize: '10px', color: 'var(--amber)', marginTop: '2px', letterSpacing: '1px' }}>{vsLine}</div>
                  )}
                  <div style={{ fontSize: '10px', color: 'var(--text-dim)', marginTop: '2px', letterSpacing: '1px' }}>
                    {b.gangName} // {b.date}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div className="text-right">
                    <div style={{ fontFamily: 'VT323,monospace', fontSize: '30px', color: 'var(--amber)', textShadow: '0 0 10px var(--amber)' }}>
                      +{total}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text-dim)', letterSpacing: '2px' }}>XP TOTAL</div>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => onDeleteBattle(b.id)} style={{ marginTop: '4px' }}>✕</button>
                </div>
              </div>

              {hasScenario && (
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '10px' }}>
                  {s.deployment && <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>DEPLOY: <span style={{ color: 'var(--text)' }}>{s.deployment}</span></div>}
                  {s.objective && <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>OBJ: <span style={{ color: 'var(--text)' }}>{s.objective}</span></div>}
                  {s.sideJob && <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>SIDE: <span style={{ color: 'var(--text)' }}>{s.sideJob}</span></div>}
                  {s.crew && <div style={{ fontSize: '10px', color: 'var(--text-dim)' }}>CREW: <span style={{ color: 'var(--text)' }}>{s.crew}</span></div>}
                </div>
              )}

              <div className="divider"></div>

              {b.fighters.map((f) => {
                const key = b.id + '_' + f.id;
                return (
                  <HistoryFighterAccordion
                    key={key}
                    fighter={f}
                    isOpen={openKey === key}
                    onToggle={() => setOpenKey((cur) => (cur === key ? null : key))}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}
