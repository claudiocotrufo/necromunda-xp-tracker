import { useState } from 'react';

export default function GangsTab({ gangs, onAddGang, onOpenGang, onDeleteGang }) {
  const [newGangName, setNewGangName] = useState('');

  function handleAdd() {
    const name = newGangName.trim();
    if (!name) return;
    onAddGang(name);
    setNewGangName('');
  }

  return (
    <>
      <div className="section-title">Gang Roster</div>
      <div className="card">
        <div className="section-title">New Gang</div>
        <div className="form-group">
          <label>Gang Name</label>
          <input
            type="text"
            placeholder="e.g. My Gang Name"
            value={newGangName}
            onChange={(e) => setNewGangName(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAdd} disabled={!newGangName.trim()}>
          + Add Gang
        </button>
      </div>

      {gangs.length === 0 ? (
        <div className="empty-state">
          <div className="icon">▣</div>
          <div>NO GANGS REGISTERED</div>
        </div>
      ) : (
        <div>
          {gangs.map((g) => (
            <div key={g.id} className="gang-item" onClick={() => onOpenGang(g.id)}>
              <div>
                <div className="gang-name">{g.name}</div>
                <div className="gang-meta">{g.fighters.length} fighters // {g.createdAt}</div>
              </div>
              <div className="flex gap-8" onClick={(e) => e.stopPropagation()}>
                <button className="btn btn-secondary btn-sm" onClick={() => onOpenGang(g.id)}>Open</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDeleteGang(g.id)}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
