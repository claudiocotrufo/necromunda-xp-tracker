export type TabId = 'gangs' | 'battle' | 'history';

interface Tab {
  id: TabId;
  label: string;
}

const TABS: Tab[] = [
  { id: 'gangs', label: 'Gangs' },
  { id: 'battle', label: 'Battle' },
  { id: 'history', label: 'History' },
];

interface TabsProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

export default function Tabs({ active, onChange }: TabsProps) {
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
