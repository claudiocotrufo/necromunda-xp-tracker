import { useState } from 'react';
import type { NewBattleInput } from '../types';

interface BattleFormState {
  name: string;
  campaign: string;
  opponent: string;
  deployment: string;
  objective: string;
  sideJob: string;
  crew: string;
}

const EMPTY_FORM: BattleFormState = {
  name: '',
  campaign: '',
  opponent: '',
  deployment: '',
  objective: '',
  sideJob: '',
  crew: '',
};

interface BattleModalProps {
  onConfirm: (input: NewBattleInput) => void;
  onCancel: () => void;
}

export default function BattleModal({ onConfirm, onCancel }: BattleModalProps) {
  const [form, setForm] = useState<BattleFormState>(EMPTY_FORM);
  const [showScenario, setShowScenario] = useState(false);

  function set(field: keyof BattleFormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleStart() {
    const name = form.name.trim();
    const campaign = form.campaign.trim();
    const opponent = form.opponent.trim();
    if (!name || !campaign || !opponent) return;
    onConfirm({
      name: name.slice(0, 80),
      campaign: campaign.slice(0, 80),
      opponent: opponent.slice(0, 80),
      scenario: {
        deployment: form.deployment.trim().slice(0, 80),
        objective: form.objective.trim().slice(0, 80),
        sideJob: form.sideJob.trim().slice(0, 80),
        crew: form.crew.trim().slice(0, 80),
      },
    });
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-title">New Battle</div>

        <div className="form-group">
          <label>Battle Name *</label>
          <input type="text" placeholder="e.g. Battle Name" value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Campaign *</label>
          <input type="text" placeholder="e.g. Campaign Name" value={form.campaign} onChange={(e) => set('campaign', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Opponent *</label>
          <input type="text" placeholder="e.g. Opponent Gang" value={form.opponent} onChange={(e) => set('opponent', e.target.value)} />
        </div>

        <div className="divider"></div>

        <div className="section-title" style={{ cursor: 'pointer' }} onClick={() => setShowScenario((v) => !v)}>
          Scenario <span style={{ color: 'var(--amber)' }}>{showScenario ? '− hide' : '+ show'}</span>
        </div>

        {showScenario && (
          <div>
            <div className="form-group">
              <label>Deployment</label>
              <input type="text" placeholder="e.g. Standard" value={form.deployment} onChange={(e) => set('deployment', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Objective</label>
              <input type="text" placeholder="e.g. Objective Type" value={form.objective} onChange={(e) => set('objective', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Side Job</label>
              <input type="text" placeholder="e.g. —" value={form.sideJob} onChange={(e) => set('sideJob', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Crew</label>
              <input type="text" placeholder="e.g. Crew Type" value={form.crew} onChange={(e) => set('crew', e.target.value)} />
            </div>
          </div>
        )}

        <div className="flex gap-8 mt-16">
          <button className="btn btn-primary" onClick={handleStart}>▶ Start</button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
