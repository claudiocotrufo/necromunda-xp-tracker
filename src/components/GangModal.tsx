import { useState } from 'react';
import type { Gang } from '../types';

interface GangModalProps {
  gang: Gang;
  onClose: () => void;
  onAddFighter: (name: string) => void;
  onDeleteFighter: (fighterId: number) => void;
  onToggleFighter: (fighterId: number) => void;
  onStartBattle: () => void;
}

export default function GangModal({ gang, onClose, onAddFighter, onDeleteFighter, onToggleFighter, onStartBattle }: GangModalProps) {
  const [newFighterName, setNewFighterName] = useState('');

  const selectedCount = gang.fighters.filter((f) => f.selected).length;

  function handleAdd() {
    const name = newFighterName.trim();
    if (!name) return;
    onAddFighter(name);
    setNewFighterName('');
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-title">{gang.name}</div>

        <div className="section-title">Add Fighter</div>
        <div className="form-group">
          <label>Fighter Name</label>
          <input
            type="text"
            placeholder="e.g. Fighter Name"
            value={newFighterName}
            onChange={(e) => setNewFighterName(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAdd} disabled={!newFighterName.trim()}>
          + Add
        </button>

        <div className="divider"></div>

        <div className="section-title">Select for Battle</div>
        <div className="selected-count">
          {selectedCount} fighter{selectedCount !== 1 ? 's' : ''} selected
        </div>

        {gang.fighters.length === 0 ? (
          <div className="text-dim" style={{ fontSize: '11px', padding: '10px 0' }}>
            // No fighters added
          </div>
        ) : (
          <div>
            {gang.fighters.map((f) => (
              <div
                key={f.id}
                className={`fighter-select-row ${f.selected ? 'selected' : ''}`}
                onClick={() => onToggleFighter(f.id)}
              >
                <span className="fighter-select-name">{f.name}</span>
                <div className="flex gap-8" style={{ alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    className="fighter-checkbox"
                    checked={!!f.selected}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => onToggleFighter(f.id)}
                  />
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteFighter(f.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="divider"></div>

        <div className="flex gap-8">
          <button className="btn btn-success" onClick={onStartBattle} disabled={selectedCount === 0}>
            ▶ New Battle
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
