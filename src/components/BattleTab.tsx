import { useState } from 'react';
import { calcXP } from '../utils/xp';
import type { ActiveBattle, BattleCounterField, BattleFighter, BattleToggleField } from '../types';

interface CounterProps {
  label: string;
  xpBadge: string;
  value: number;
  onChange: (value: number) => void;
}

function Counter({ label, xpBadge, value, onChange }: CounterProps) {
  return (
    <div className="xp-row">
      <span className="xp-row-label">
        {label} <span className="xp-badge">{xpBadge}</span>
      </span>
      <div className="xp-counter">
        <button className="xp-btn" onClick={() => onChange(Math.max(0, value - 1))}>−</button>
        <span className="xp-count">{value}</span>
        <button className="xp-btn" onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}

interface FighterAccordionProps {
  fighter: BattleFighter;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (field: BattleCounterField | BattleToggleField, value: number | boolean) => void;
}

function FighterAccordion({ fighter, isOpen, onToggle, onUpdate }: FighterAccordionProps) {
  const xp = calcXP(fighter);
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={onToggle}>
        <span className="fighter-name">{fighter.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="text-right">
            <div className="xp-total">{xp}</div>
            <div className="xp-label">XP</div>
          </div>
          <span className="text-dim" style={{ fontSize: '14px' }}>{isOpen ? '▲' : '▼'}</span>
        </div>
      </div>

      {isOpen && (
        <div className="accordion-body">
          <div className="xp-sections">
            <div className="xp-section">
              <div className="xp-section-title">// Participation</div>
              <label className="xp-checkbox-big">
                <input
                  type="checkbox"
                  checked={fighter.participated}
                  onChange={(e) => onUpdate('participated', e.target.checked)}
                />
                <span>Participated <span className="xp-badge">+1</span></span>
              </label>
            </div>

            <div className="xp-section">
              <div className="xp-section-title">// Kill</div>
              <Counter label="Seriously Injured" xpBadge="+1" value={fighter.seriouslyInjured} onChange={(v) => onUpdate('seriouslyInjured', v)} />
              <Counter label="Out of Action" xpBadge="+2" value={fighter.outOfAction} onChange={(v) => onUpdate('outOfAction', v)} />
              <Counter label="OOA Leader/Champion" xpBadge="+3" value={fighter.outOfActionChampion} onChange={(v) => onUpdate('outOfActionChampion', v)} />
            </div>

            <div className="xp-section">
              <div className="xp-section-title">// Support</div>
              <Counter label="Assistance Recovery" xpBadge="+1" value={fighter.assistance} onChange={(v) => onUpdate('assistance', v)} />
              <Counter label="Mentor Bonus" xpBadge="+1" value={fighter.mentor} onChange={(v) => onUpdate('mentor', v)} />
            </div>

            <div className="xp-section">
              <div className="xp-section-title">// Objective</div>
              <label className="xp-checkbox-big">
                <input
                  type="checkbox"
                  checked={fighter.objective}
                  onChange={(e) => onUpdate('objective', e.target.checked)}
                />
                <span>Controlled Objective <span className="xp-badge">+1</span></span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface BattleTabProps {
  activeBattle: ActiveBattle | null;
  onUpdateFighter: (fighterId: number, field: BattleCounterField | BattleToggleField, value: number | boolean) => void;
  onFinalize: () => void;
  onCancel: () => void;
}

export default function BattleTab({ activeBattle, onUpdateFighter, onFinalize, onCancel }: BattleTabProps) {
  const [openFighterId, setOpenFighterId] = useState<number | null>(null);

  if (!activeBattle) {
    return (
      <div className="empty-state">
        <div className="icon">⚔</div>
        <div>NO ACTIVE BATTLE</div>
        <div className="mt-8 text-dim">Select a gang and start a battle</div>
      </div>
    );
  }

  const b = activeBattle;
  const vsLine = [b.campaign, b.opponent ? 'VS ' + b.opponent : null, b.date].filter(Boolean).join(' // ');

  return (
    <div>
      <div className="battle-header">
        <div className="battle-name">{b.name}</div>
        <div className="battle-vs">{vsLine}</div>
      </div>
      <div className="alert-info">// Track XP for each fighter. Finalize at end of battle.</div>

      <div>
        {b.fighters.map((f) => (
          <FighterAccordion
            key={f.id}
            fighter={f}
            isOpen={openFighterId === f.id}
            onToggle={() => setOpenFighterId((cur) => (cur === f.id ? null : f.id))}
            onUpdate={(field, value) => onUpdateFighter(f.id, field, value)}
          />
        ))}
      </div>

      <div className="mt-20 flex gap-8">
        <button className="btn btn-success" onClick={onFinalize}>✓ Finalize</button>
        <button className="btn btn-danger" onClick={onCancel}>✕ Cancel</button>
      </div>
    </div>
  );
}
