const TABS = [
  { id: 'gangs', label: 'Gangs' },
  { id: 'battle', label: 'Battle' },
  { id: 'history', label: 'History' },
];

export default function Tabs({ active, onChange }) {
  return (
    <div className="tabs">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
